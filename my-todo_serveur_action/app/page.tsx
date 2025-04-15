import Image from 'next/image';

export default function Home() {
  return (
    <div className="splash-container">
      <div className="left-box">
        <section>
          <h1>Bienvenue sur l'application</h1>
          <p>Une CRUD application codée dans le cadre de la formation Next.js de DonkeyGeek</p>
          <h2>Objectifs:</h2>
          <ul>
            <li>Coder une application fonctionnelle tout en révisant les concepts de Next.js (App Router)</li>
            <li>Découvrir les bases de données NoSQL (MongoBD) avant d'aborder le SQL avec PostgreSQL</li>
            <li>Mettre en pratique nos connaissances des "Routes Handlers" avec les méthdoes GET, PATCH et DELETE (valeurs dynamiques)</li>
          </ul>
        </section>
      </div>
      <div className="right-box">
        <Image 
          alt='Bonhomme de neige'
          src="https://cdn.pixabay.com/photo/2012/04/13/00/32/snowman-31303_1280.png"
          width={'400'}
          height={'400'}
        />
      </div>
    </div>
  );
}
