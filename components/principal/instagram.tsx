// instagram.tsx
'use client';
import React from 'react';

interface InstagramProps {
  instagramLink: string;
  instagramIconSrc: string;
}

const Instagram: React.FC<InstagramProps> = ({ instagramLink, instagramIconSrc }) => {
  return (
    <section className="instagramSection">
      <div className="instagramContainer">
        <div className="contentWrapper">
          <div className="leftContent">
            {instagramIconSrc && (
              <img src={instagramIconSrc} alt="Icono de Instagram" className="instagramIcon" />
            )}
          </div>
          <div className="rightContent">
            <h2 className="instagramTitle">Síguenos en Instagram</h2>
            <p className="instagramSubtitle">Sé el primero en enterarte de nuestros últimos lanzamientos y nuevas colecciones.</p>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="instagramButton">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;