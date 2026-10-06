import subprocess, re, sys
from PIL import Image, ImageFilter
import numpy as np

BLUE='#3C4984'; CORAL='#EF5155'

def masks(path, scale):
    im=Image.open(path).convert('RGBA')
    W,H=im.size
    # composite on white
    bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im)
    big=bg.convert('RGB').resize((W*scale,H*scale),Image.LANCZOS)
    a=np.asarray(big).astype(float)
    r,g,b=a[...,0],a[...,1],a[...,2]
    # ink-ness: distance from white
    dark=255-np.minimum(np.minimum(r,g),b)
    coral=(r-b>60)&(dark>80)
    blue=(b-r>25)&(dark>90)
    gray=(np.abs(r-b)<18)&(np.abs(r-g)<18)&(dark>110)
    return coral,blue,gray,W,H,scale

def trace(mask,name,W,H,scale):
    img=Image.fromarray(np.where(mask,0,255).astype('uint8'))
    img=img.filter(ImageFilter.MedianFilter(3))
    img.save(f'svg-work/{name}.pbm')
    subprocess.run(['potrace',f'svg-work/{name}.pbm','-s','-o',f'svg-work/{name}.svg','--turdsize','12','--alphamax','1.1','--opttolerance','0.3','-u','1'],check=True)
    s=open(f'svg-work/{name}.svg').read()
    g=re.search(r'(<g transform=.*?</g>)',s,re.S).group(1)
    g=re.sub(r'fill="#000000"','',g)
    return g


def build(src,out,scale,crop=None):
    if crop:
        im=Image.open(src).convert('RGBA').crop(crop); im.save('svg-work/_crop.png'); src='svg-work/_crop.png'
    coral,blue,gray,W,H,sc=masks(src,scale)
    layers=[('coral',coral,CORAL),('blue',blue,BLUE)]
    if gray.sum()>500: layers.append(('gray',gray,'#363535'))
    body=''
    for n,m,col in layers:
        body+=f'<g fill="{col}">'+trace(m,out+'-'+n,W,H,sc)+'</g>\n'
    vbW,vbH=W*sc,H*sc
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vbW} {vbH}" width="{W}" height="{H}" role="img" aria-labelledby="t">
<title id="t">Corporación Educativa “Santa María de Surco”</title>
{body}</svg>'''
    open(out+'.svg','w').write(svg)
    print(out, len(svg), [ (n,int(m.sum())) for n,m,c in layers])

build('logo-horizontal.png','logo-horizontal',3)
build('logo-horizontal.png','logo-emblema',4,crop=(0,0,345,429))
build('logo-icono.png','logo-isotipo',4)
