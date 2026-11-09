export function ProjectMedia({ project, sizes = '(min-width: 1600px) 1440px, 92vw' }) {
  const asset = `./assets/${project.image}`;
  return (
    <img src={`${asset}-720.webp`}
      srcSet={[360, 720, 1440].map(width => `${asset}-${width}.webp ${width}w`).join(', ')}
      sizes={sizes} width="1440" height="900" loading="lazy" decoding="async"
      alt={`Capture de l’interface de ${project.name}`} />
  );
}

export function Technologies({ items }) {
  return <ul className="tech" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
