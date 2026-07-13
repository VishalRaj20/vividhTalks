import { useState } from 'react';
import { DollarSign, Eye, Award, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import './ROICalculator.css';

const ROICalculator = () => {
  const [listeners, setListeners] = useState(10000);
  const [episodesPerMonth, setEpisodesPerMonth] = useState(4);
  const [cpm, setCpm] = useState(500); // Cost Per Mille (Thousand views) in INR
  const [shortsPerEpisode, setShortsPerEpisode] = useState(3);

  // Calculations
  const sponsorSlots = 1.5; // Average sponsors per episode
  const monthlySponsorship = Math.round((listeners * (cpm / 1000) * sponsorSlots) * episodesPerMonth);
  const monthlyReach = Math.round(listeners * episodesPerMonth);
  const organicShortsReach = Math.round(listeners * shortsPerEpisode * 2.8 * episodesPerMonth);
  const annualTotalValue = Math.round(monthlySponsorship * 12 + organicShortsReach * 0.18);

  // Dynamic formatting
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    }
    return value;
  };

  return (
    <div className="roi-calculator-container glass-card">
      <div className="roi-calculator-header">
        <span className="roi-badge"><Sparkles size={14} /> GROWTH ENGINE</span>
        <h3 className="h3">Estimate Your Podcast Value</h3>
        <p className="text-secondary text-sm">Drag the sliders to see the potential audience reach and revenue your brand can generate.</p>
      </div>

      <div className="roi-grid-wrapper">
        {/* Left Column: Sliders */}
        <div className="roi-sliders-col">
          {/* Slider 1: Listeners */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label htmlFor="listeners-range">Avg. Views/Listeners <span className="text-secondary">(per episode)</span></label>
              <span className="slider-value text-accent font-mono">{formatNumber(listeners)}</span>
            </div>
            <input
              id="listeners-range"
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={listeners}
              onChange={(e) => setListeners(parseInt(e.target.value))}
              className="roi-slider"
            />
            <div className="slider-limits font-mono">
              <span>1K</span>
              <span>100K</span>
            </div>
          </div>

          {/* Slider 2: Episodes */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label htmlFor="episodes-range">Episodes Per Month</label>
              <span className="slider-value text-accent font-mono">{episodesPerMonth}</span>
            </div>
            <input
              id="episodes-range"
              type="range"
              min="1"
              max="8"
              step="1"
              value={episodesPerMonth}
              onChange={(e) => setEpisodesPerMonth(parseInt(e.target.value))}
              className="roi-slider"
            />
            <div className="slider-limits font-mono">
              <span>1 ep</span>
              <span>8 eps</span>
            </div>
          </div>

          {/* Slider 3: CPM Sponsorship */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label htmlFor="cpm-range">Sponsorship CPM <span className="text-secondary">(₹ per 1K views)</span></label>
              <span className="slider-value text-accent font-mono">₹{cpm}</span>
            </div>
            <input
              id="cpm-range"
              type="range"
              min="200"
              max="2000"
              step="50"
              value={cpm}
              onChange={(e) => setCpm(parseInt(e.target.value))}
              className="roi-slider"
            />
            <div className="slider-limits font-mono">
              <span>₹200</span>
              <span>₹2,000</span>
            </div>
          </div>

          {/* Slider 4: Shorts per episode */}
          <div className="roi-slider-group">
            <div className="roi-slider-header">
              <label htmlFor="shorts-range">Shorts/Reels Created <span className="text-secondary">(per episode)</span></label>
              <span className="slider-value text-accent font-mono">{shortsPerEpisode} Clips</span>
            </div>
            <input
              id="shorts-range"
              type="range"
              min="0"
              max="10"
              step="1"
              value={shortsPerEpisode}
              onChange={(e) => setShortsPerEpisode(parseInt(e.target.value))}
              className="roi-slider"
            />
            <div className="slider-limits font-mono">
              <span>0 clips</span>
              <span>10 clips</span>
            </div>
          </div>
        </div>

        {/* Right Column: Output Metrics */}
        <div className="roi-metrics-col">
          <div className="metrics-summary-card">
            <span className="metric-label">Estimated Monthly Sponsorship</span>
            <span className="metric-val text-accent">{formatCurrency(monthlySponsorship)}</span>
            <div className="metric-subtext">Based on {sponsorSlots} average ad integrations per episode.</div>
          </div>

          <div className="metrics-mini-grid">
            <div className="metric-mini-card">
              <div className="card-icon-title">
                <Eye size={16} className="text-accent" />
                <span>Monthly Reach</span>
              </div>
              <span className="card-val font-mono">{formatNumber(monthlyReach)}</span>
              <span className="card-sub">Core listeners</span>
            </div>

            <div className="metric-mini-card">
              <div className="card-icon-title">
                <TrendingUp size={16} className="text-accent" />
                <span>Shorts Impressions</span>
              </div>
              <span className="card-val font-mono">+{formatNumber(organicShortsReach)}</span>
              <span className="card-sub">Organic virality</span>
            </div>
          </div>

          <div className="roi-impact-banner">
            <div className="banner-glow"></div>
            <div className="flex justify-between items-center relative z-1">
              <div>
                <span className="banner-lbl">ESTIMATED ANNUAL VALUE</span>
                <h4 className="banner-val">{formatCurrency(annualTotalValue)}</h4>
              </div>
              <div className="banner-icon">
                <Award size={36} />
              </div>
            </div>
            <p className="banner-desc relative z-1">Combines ad revenue and brand authority value driven by vertical social platforms.</p>
          </div>
        </div>
      </div>
      <div className="calculator-info">
        <HelpCircle size={12} />
        <span>Sponsorship calculations are conservative industry estimates. Actual pricing varies by niche, guest authority, and conversion rates.</span>
      </div>
    </div>
  );
};

export default ROICalculator;
