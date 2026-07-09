import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { episodes } from '../data/dummyData';

const guestsList = [
  { name: "Deepak Thakur", role: "Playback Singer & Bigg Boss Fame", image: "/guests/Deepak Thakur.webp" },
  { name: "Shubham Raj", role: "Director - Garda Media", image: "/guests/Shubham Raj.webp" },
  { name: "Sujit Kumar Mishra", role: "Founder & CEO - Thikedaar.com", image: "/guests/Sujit Kumar Mishra.webp" },
  { name: "Preeti Singh", role: "Associate Professor - RSMT College", image: "/guests/Preeti Singh.webp" },
  { name: "Abhishek Tiwary", role: "Political Analyst & Election Psychologist", image: "/guests/Abhishek Tiwary.webp" },
  { name: "Aditya Raj", role: "National President - Yuva Wahini Bharat", image: "/guests/Aditya Raj.webp" },
  { name: "Dr. Kishlay", role: "Metabolic Doctor", image: "/guests/Dr. Kishlay.webp" },
  { name: "Dr. Shubhash Krishna", role: "Programminng Director & DGM - Radio City", image: "/guests/Dr. Shubhash Krishna.webp" },
  { name: "Sneham Choudhary", role: "Internationally Certified Image Consultant & Fashion Stylist", image: "/guests/Sneham Choudhary.webp" },
  { name: "Satyam Parkhi", role: "Founder - Chicka Litti & Parkhi Production", image: "/guests/Satyam Parkhi.webp" },
  { name: "Vikash Aryan", role: "Actor & Founder - Actor Chaiwala", image: "/guests/Vikash Aryan.webp" },
  { name: "Pd. Shree Abhay Krishan Jee Maharaj", role: "Political Astrologer", image: "/guests/Pd. Shree Abhay Krishan Jee Maharaj.webp" }
];

const FeaturedGuests = () => {

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);



  return (
    <div className="featured-guests-page">
      <SEO
        title="Featured Guests - Vividh Talks"
        description="Conversations with change-makers shaping modern India."
      />

      {/* HEADER SECTION */}
      <section className="section-padding" style={{ paddingBottom: '20px', paddingTop: '120px' }}>
        <div className="container text-center animate-on-scroll">
          <div className="section-tag mx-auto mb-4"><span className="section-tag-dot"></span> OUR GUESTS</div>
          <h1 className="h1 mb-4">Featured <span className="text-accent">Guests</span></h1>
          <p className="subheading mx-auto max-w-2xl text-accent font-bold">
            Conversations with change-makers shaping modern India
          </p>
        </div>
      </section>

      {/* GUESTS GRID (Based on the Reference Image) */}
      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div
            className="guests-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '40px 20px',
              justifyItems: 'center'
            }}
          >
            {guestsList.map((guest, idx) => (
              <div
                className="guest-grid-item animate-on-scroll text-center"
                key={idx}
                style={{
                  transitionDelay: `${(idx % 6) * 0.1}s`,
                  width: '100%',
                  maxWidth: '220px'
                }}
              >
                <div
                  className="guest-image-wrapper mb-4"
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,77,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                  }}
                >
                  <img
                    loading="lazy"
                    src={guest.image}
                    alt={guest.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h3 className="h4 font-bold mb-1" style={{ fontSize: '1.1rem' }}>{guest.name}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: '1.4' }}>{guest.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO REVIEWS SECTION */}
      <section className="section-padding bg-secondary mt-8">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <h2 className="h2">Video <span className="text-accent">Reviews & Moments</span></h2>
            <p className="subheading mx-auto mt-4 max-w-2xl">
              Hear directly from our guests about their experience on Vividh Talks.
            </p>
          </div>

          <div className="video-testimonial-grid animate-on-scroll" style={{ marginTop: '48px' }}>
            {episodes.slice(0, 3).map((episode, idx) => {
              const guestNameMatch = episode.guest.match(/Featuring (.*?),/);
              const guestName = guestNameMatch ? guestNameMatch[1] : 'Featured Guest';

              return (
                <div className="video-testimonial-card glass-card" key={episode.id} style={{ transitionDelay: `${idx * 0.1}s` }}>
                  {/* Note for User: To use your own videos, place them in the 'public' folder (e.g., public/videos/review1.mp4) 
                      and update the src attribute here to '/videos/review1.mp4' */}
                  <video
                    src="/reviews/review1.mp4"
                    controls
                    className="video-testimonial-player"
                    poster={episode.guestImage}
                  ></video>
                  <div className="video-testimonial-info">
                    <h4 className="h4">{guestName}</h4>
                    <p className="text-secondary text-sm">"What an amazing experience sharing my story on Vividh Talks."</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container animate-on-scroll">
          <h2 className="h2 mb-6">Know someone inspiring?</h2>
          <p className="subheading mb-8">We are always looking for unique stories and voices.</p>
          <div className="flex justify-center">
            <Link to="/nominate-guest" className="btn btn-primary">Nominate a Guest <ArrowRight size={18} style={{ marginLeft: '8px' }} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedGuests;
