import React, { useState } from 'react';
import FlowersImg from '../../assets/Flowers-for-website.png';
import { supabase } from '../../utils/supabaseClient';
import { useToastContext } from '../../context/ToastContext';

interface Guest {
  name: string;
  email: string;
  attending: boolean;
}

interface RSVPData {
  mainGuest: Guest;
  additionalGuests: Guest[];
  totalGuests: number;
  message: string;
}

const RSVPForm: React.FC = () => {
  const { showError } = useToastContext(); // Only using showError, not showSuccess
  const [formData, setFormData] = useState<RSVPData>({
    mainGuest: {
      name: '',
      email: '',
      attending: true,
    },
    additionalGuests: [],
    totalGuests: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [bringingPartner, setBringingPartner] = useState<'yes' | 'no'>('no');
  const [partnerName, setPartnerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    if (!formData.mainGuest.name || !formData.mainGuest.email) {
      showError('Please fill in your name and email');
      setIsSubmitting(false);
      return;
    }
    if (formData.mainGuest.attending && bringingPartner === 'yes' && !partnerName.trim()) {
      showError('Please enter your partner\'s name');
      setIsSubmitting(false);
      return;
    }

    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'your_supabase_project_url_here' || 
        supabaseAnonKey === 'your_supabase_anon_key_here') {
      showError('Supabase is not configured. Please contact the website administrator.');
      setIsSubmitting(false);
      return;
    }

    // Check if email already RSVP'd
    const { data: existing, error: checkError } = await supabase
      .from('rsvps')
      .select('id')
      .eq('email', formData.mainGuest.email)
      .maybeSingle();

    if (checkError) {
      showError('There was a problem checking your RSVP. Please try again.');
      setIsSubmitting(false);
      return;
    }
    if (existing) {
      showError(
        "This email has already submitted an RSVP. If you submitted incorrect information, please call Thabi & Trevor to update your RSVP."
      );
      setIsSubmitting(false);
      return;
    }

    // Prepare data for Supabase
    const rsvpPayload = {
      name: formData.mainGuest.name,
      email: formData.mainGuest.email,
      attending: formData.mainGuest.attending,
      partner_name: formData.mainGuest.attending && bringingPartner === 'yes' ? partnerName : null,
      message: formData.message || null,
      submitted_at: new Date().toISOString(),
    };

    // Debug: log payload and supabase client
    console.log('RSVP Payload:', rsvpPayload);
    // console.log('Supabase client:', supabase);

    // Double-check your table name here: is it 'rsvps' or 'rsvp'?
    // Save to Supabase
    const { error: supabaseError } = await supabase.from('rsvps').insert([rsvpPayload]);
    if (supabaseError) {
      console.error('Supabase insert error:', supabaseError); // Debug log
      showError(`There was a problem saving your RSVP. Please try again. (${supabaseError.message})`);
      setIsSubmitting(false);
      return;
    }

    // Try to call email function, but don't fail the RSVP if it doesn't work
    try {
      const emailFunctionUrl = `${supabaseUrl}/functions/v1/send-rsvp-email`;
      
      const response = await fetch(emailFunctionUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          email: formData.mainGuest.email,
          name: formData.mainGuest.name,
          attending: formData.mainGuest.attending,
          partnerName: formData.mainGuest.attending && bringingPartner === 'yes' ? partnerName : null,
          message: formData.message
        }),
      });

      if (!response.ok) {
        console.warn('Email function returned non-OK status:', response.status);
      }
    } catch (emailError) {
      // Log the error but don't prevent RSVP success
      console.warn('Email function not available or failed:', emailError);
    }

    // Success - just set submitted to true, don't show toast
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-8 sm:py-16 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center py-12 sm:py-16">
            <img
              src={FlowersImg}
              alt="Floral decoration"
              className="mx-auto mb-4 sm:mb-6 max-w-[100px] sm:max-w-[120px] md:max-w-[160px] lg:max-w-[200px] drop-shadow-lg"
              style={{ objectFit: 'contain' }}
            />
            <h3 className="font-serif text-2xl sm:text-3xl text-sage-700 mb-3 sm:mb-4">Thank You!</h3>
            <p className="text-sage-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Your RSVP has been submitted successfully.<br />We're looking forward to celebrating with you!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-8 sm:py-16 bg-cream-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg sm:max-w-2xl mx-auto px-3 sm:px-4">
        <div
          className="relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-blush-100 bg-white/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-12"
          style={{
            background: 'rgba(255,255,255,0.35)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            border: '1px solid rgba(255,255,255,0.18)',
            WebkitBackdropFilter: 'blur(16px)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <img
            src={FlowersImg}
            alt="Floral decoration"
            className="mx-auto mb-4 sm:mb-6 max-w-[100px] sm:max-w-[120px] md:max-w-[160px] lg:max-w-[200px] drop-shadow-lg"
            style={{ objectFit: 'contain' }}
          />
          <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-16 sm:h-20 bg-blush-100 rounded-full blur-2xl opacity-40 z-0"></div>
          <div className="absolute -bottom-6 sm:-bottom-8 right-6 sm:right-8 w-20 sm:w-24 h-20 sm:h-24 bg-blush-200 rounded-full blur-2xl opacity-30 z-0"></div>
          <div className="relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-sage-800 mb-4 sm:mb-6 drop-shadow">RSVP</h2>
            <p className="text-center text-sage-600 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Please let us know if you'll be joining us on our special day by <br className="hidden sm:block"/>
              <span className='font-bold'>August 1, 2025.</span> <br />
              We're excited to celebrate with you!
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sage-700 mb-2 font-semibold text-sm sm:text-base" htmlFor="name">
                    Your Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.mainGuest.name}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        mainGuest: { ...formData.mainGuest, name: e.target.value },
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sage-200 rounded-lg sm:rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blush-400 shadow text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sage-700 mb-2 font-semibold text-sm sm:text-base" htmlFor="email">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.mainGuest.email}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        mainGuest: { ...formData.mainGuest, email: e.target.value },
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sage-200 rounded-lg sm:rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blush-400 shadow text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sage-700 mb-3 font-semibold text-sm sm:text-base" htmlFor="attending">
                    Will you be attending?
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <label className="inline-flex items-center bg-white/50 rounded-lg px-3 py-2 border border-sage-200 hover:bg-white/70 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.mainGuest.attending}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            mainGuest: { ...formData.mainGuest, attending: true },
                          })
                        }
                        className="form-radio text-blush-500 mr-2"
                        disabled={isSubmitting}
                      />
                      <span className="text-sage-600 text-sm sm:text-base">Yes, I'll be there! 🎉</span>
                    </label>
                    <label className="inline-flex items-center bg-white/50 rounded-lg px-3 py-2 border border-sage-200 hover:bg-white/70 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={!formData.mainGuest.attending}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            mainGuest: { ...formData.mainGuest, attending: false },
                          })
                        }
                        className="form-radio text-blush-500 mr-2"
                        disabled={isSubmitting}
                      />
                      <span className="text-sage-600 text-sm sm:text-base">Sorry, can't make it 😔</span>
                    </label>
                  </div>
                </div>
                
                {/* Only show partner section if attending */}
                {formData.mainGuest.attending && (
                  <>
                    <div>
                      <label className="block text-sage-700 mb-3 font-semibold text-sm sm:text-base">
                        Bringing a partner?
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <label className="inline-flex items-center bg-white/50 rounded-lg px-3 py-2 border border-sage-200 hover:bg-white/70 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="bringingPartner"
                            value="yes"
                            checked={bringingPartner === 'yes'}
                            onChange={() => setBringingPartner('yes')}
                            className="form-radio text-blush-500 mr-2"
                            disabled={isSubmitting}
                          />
                          <span className="text-sage-600 text-sm sm:text-base">Yes</span>
                        </label>
                        <label className="inline-flex items-center bg-white/50 rounded-lg px-3 py-2 border border-sage-200 hover:bg-white/70 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="bringingPartner"
                            value="no"
                            checked={bringingPartner === 'no'}
                            onChange={() => setBringingPartner('no')}
                            className="form-radio text-blush-500 mr-2"
                            disabled={isSubmitting}
                          />
                          <span className="text-sage-600 text-sm sm:text-base">No</span>
                        </label>
                      </div>
                    </div>
                    {bringingPartner === 'yes' && (
                      <div>
                        <label className="block text-sage-700 mb-2 font-semibold text-sm sm:text-base" htmlFor="partnerName">
                          Partner's Name*
                        </label>
                        <input
                          type="text"
                          id="partnerName"
                          name="partnerName"
                          value={partnerName}
                          onChange={e => setPartnerName(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sage-200 rounded-lg sm:rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blush-400 shadow text-sm sm:text-base"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    )}
                  </>
                )}
                
                <div>
                  <label className="block text-sage-700 mb-2 font-semibold text-sm sm:text-base" htmlFor="message">
                    Any message for the couple? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sage-200 rounded-lg sm:rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-blush-400 shadow text-sm sm:text-base resize-none"
                    rows={3}
                    placeholder="Share your congratulations, well wishes, or any questions you might have..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 sm:mt-10 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#555c78] text-white py-3 sm:py-2 px-6 sm:px-8 rounded-full hover:bg-[#4a5068] transition-colors duration-300 shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit RSVP'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;