import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'nl' ? 'en' : 'nl';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const translations = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      cases: 'Cases',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      callUs: 'Bel ons',
      contactUs: 'Vul het formulier in'
    },
    footer: {
      tagline: '"Optimize What Matters"',
      email: 'info@optivaize.nl',
      emailLabel: 'Algemene vragen',
      phone: '+31 6 42698918',
      phoneLabel: 'Openingstijden: 9:00 - 18:00 CET',
      address: 'Groenekanseweg 70, De Bilt',
      addressDetail: '3732AG, Nederland',
      ctaTitle: 'Klaar om uw bedrijf te transformeren?',
      ctaSubtitle: 'Bel ons direct of vul het contactformulier in',
      callUs: 'Bel ons: +31 6 42698918',
      fillForm: 'Vul het formulier in',
      copyright: '© 2026 Optivaize. Alle rechten voorbehouden. • Optimize What Matters.',
      privacyPolicy: 'Privacybeleid',
      termsOfService: 'Algemene voorwaarden',
      cookiePolicy: 'Cookiebeleid'
    },
    bedankt: {
      title: 'voor uw bericht!',
      subtitle: 'Wij hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op. Meestal binnen 24 uur.',
      directContact: 'Direct contact?',
      callUs: 'Bel ons: +31 6 42698918',
      linkedin: 'Geronimo op LinkedIn',
      email: 'Stuur een e-mail',
      backHome: 'Terug naar Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations & Marketing'
      },
      team: {
        geronimo: 'Operations & Marketing',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      cases: 'Cases',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      callUs: 'Call Us',
      contactUs: 'Fill in the Form'
    },
    footer: {
      tagline: '"Optimize What Matters"',
      email: 'info@optivaize.nl',
      emailLabel: 'General Inquiries',
      phone: '+31 6 42698918',
      phoneLabel: 'Business Hours: 9AM - 6PM CET',
      address: 'Groenekanseweg 70, De Bilt',
      addressDetail: '3732AG, Netherlands',
      ctaTitle: 'Ready to transform your business?',
      ctaSubtitle: 'Call us directly or fill in the contact form',
      callUs: 'Call Us: +31 6 42698918',
      fillForm: 'Fill in the Form',
      copyright: '© 2026 Optivaize. All rights reserved. • Optimize What Matters.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy'
    },
    bedankt: {
      title: 'for your message!',
      subtitle: 'We have received your request and will contact you as soon as possible. Usually within 24 hours.',
      directContact: 'Direct contact?',
      callUs: 'Call Us: +31 6 42698918',
      linkedin: 'Geronimo on LinkedIn',
      email: 'Send an Email',
      backHome: 'Back to Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations & Marketing'
      },
      team: {
        geronimo: 'Operations & Marketing',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  }
};
