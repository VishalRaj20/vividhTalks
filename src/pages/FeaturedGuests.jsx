import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/ui/OptimizedImage';
import VideoReviewReel from '../components/ui/VideoReviewReel';
import { Play } from 'lucide-react';
import { videoReviews } from '../data/dummyData';

const guestsList = [
  { name: "Deepak Thakur", role: "Playback Singer & Bigg Boss Fame", image: "/guests/Deepak Thakur.webp" },
  { name: "Shubham Raj", role: "Director - Garda Media", image: "/guests/Shubham Raj.webp" },
  { name: "Sujit Kumar Mishra", role: "Founder & CEO - Thikedaar.com", image: "/guests/Sujit Kumar Mishra.webp" },
  { name: "Preeti Singh", role: "Associate Professor - RSMT College", image: "/guests/Preeti Singh.webp" },
  { name: "Abhishek Tiwary", role: "Political Analyst & Election Psychologist", image: "/guests/Abhishek Tiwary.webp" },
  { name: "Aditya Raj", role: "National President - Yuva Wahini Bharat", image: "/guests/Aditya Raj.webp" },
  { name: "Dr. Kishlay", role: "Metabolic Doctor", image: "/guests/Dr. Kishlay.webp" },
  { name: "Dr. Shubhash Krishna", role: "Programminng Director & DGM - Radio City", image: "/guests/Dr Shubhash Krishna.webp" },
  { name: "Sneham Choudhary", role: "Internationally Certified Image Consultant & Fashion Stylist", image: "/guests/Sneham Choudhary.webp" },
  { name: "Satyam Parkhi", role: "Founder - Chicka Litti & Parkhi Production", image: "/guests/Satyam Parkhi.webp" },
  { name: "Vikash Aryan", role: "Actor & Founder - Actor Chaiwala", image: "/guests/Vikash Aryan.webp" },
  { name: "Pd. Shree Abhay Krishan Jee Maharaj", role: "Political Astrologer", image: "/guests/Pd. Shree Abhay Krishan Jee Maharaj.webp" }
];

const FeaturedGuests = () => {
  const [isVideoReelOpen, setIsVideoReelOpen] = useState(false);
  const [initialReelIndex, setInitialReelIndex] = useState(0);

  const formattedReviews = videoReviews.map((review) => ({
    id: review.id,
    title: review.quote || review.guestName + " Review",
    image: review.poster,
    videoUrl: review.src,
    channelName: review.guestName,
  }));

  const handleReviewClick = (index) => {
    setInitialReelIndex(index);
    setIsVideoReelOpen(true);
  };

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

      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes floatSlightly {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .creative-card-1 {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .creative-card-2 {
          animation: floatSlightly 7s ease-in-out infinite;
        }
      `}</style>

      {/* HEADER SECTION */}
      <section className="section-padding" style={{ paddingBottom: '80px', paddingTop: '150px', position: 'relative' }}>
        {/* Decorative background blurs */}
        <div style={{ position: 'absolute', top: '5%', left: '5%', width: '300px', height: '300px', background: 'var(--accent-primary)', opacity: '0.06', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: '400px', height: '400px', background: '#872EC4', opacity: '0.04', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

        <div className="container animate-on-scroll">
          {/* <div className="section-tag mx-auto mb-10" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> OUR GUESTS</div> */}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>

            {/* Voices That Inspire Block */}
            <div className="glass-card creative-card-2" style={{
              padding: '48px',
              borderRadius: '24px',
              borderRight: '4px solid var(--accent-primary)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.04) 100%)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100%', background: 'linear-gradient(270deg, rgba(255,77,0,0.1) 0%, transparent 100%)', pointerEvents: 'none' }}></div>
              <h2 className="h1 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Voices That <span className="text-accent">Inspire India</span></h2>
              <p className="text-secondary" style={{ fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '800px', marginLeft: '20px' }}>
                From entrepreneurs to public leaders, we feature guests with stories, experiences and ideas that create impact.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* GUESTS GRID (Based on the Reference Image) */}
      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="featured-guests-page-grid">
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
                  <OptimizedImage
                    loading="lazy"
                    src={guest.image}
                    alt={guest.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center'
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
            {videoReviews.map((review, idx) => (
              <div 
                className="video-testimonial-card glass-card" 
                key={review.id} 
                style={{ transitionDelay: `${idx * 0.1}s`, cursor: 'pointer' }}
                onClick={() => handleReviewClick(idx)}
              >
                <div className="video-player-placeholder video-testimonial-player" style={{ position: 'relative', width: '100%', aspectRatio: '9/12', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                  <OptimizedImage
                    src={review.poster}
                    alt={review.guestName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  />
                  <div className="play-overlay" style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <button className="play-btn" style={{
                      background: 'rgba(255, 77, 0, 0.9)', border: 'none', borderRadius: '50%',
                      width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(255, 77, 0, 0.4)', pointerEvents: 'none'
                    }}>
                      <Play size={28} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>
                <div className="video-testimonial-info mt-40">
                  <h4 className="h4">{review.guestName}</h4>
                  <p className="text-secondary text-sm">{review.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <VideoReviewReel 
          clips={formattedReviews} 
          isOpen={isVideoReelOpen} 
          onClose={() => setIsVideoReelOpen(false)} 
          initialIndex={initialReelIndex}
        />
      </section>

      {/* CTA SECTION */}
      <section className="section-padding text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container animate-on-scroll">
          <h2 className="h2 mb-6">Know someone inspiring?</h2>
          <p className="subheading mb-8">We are always looking for unique stories and voices.</p>
          <div className="flex justify-center mt-4">
            <Link to="/nominate-guest" className="btn btn-primary">Nominate a Guest <ArrowRight size={18} style={{ marginLeft: '8px' }} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedGuests;
