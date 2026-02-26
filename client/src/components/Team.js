import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';
import { Linkedin } from 'lucide-react';

const TeamSection = styled.section`
  id: team;
  padding: 6rem 0;
  background: #F8FAFC;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  color: #0F172A;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 3rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const GridCell = styled.div`
  display: flex;
`;

const TeamCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border: 2px solid;
    border-image: linear-gradient(135deg, #3B82F6, #10B981) 1;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem;
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  overflow: hidden;
  border: 4px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #3B82F6, #10B981) border-box;
`;

const GradientBorder = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TeamCard}:hover & {
    opacity: 1;
  }
`;

const MemberName = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const MemberTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
`;

const MemberBio = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #64748B;
  margin-bottom: 2rem;
  text-align: left;
  flex: 1;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

const SkillBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1.5rem 0;
`;

const SkillBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

const teamStaticConfig = [
  { name: "Geronimo S.", photo: "/uploads/geronimo.png", linkedin: "https://www.linkedin.com/in/geronimosaija/", gradient: "linear-gradient(135deg, #10B981, #059669)" },
  { name: "Maximilian Bladt", photo: "/uploads/max.png", linkedin: "https://www.linkedin.com/in/max-bladt/", gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)" },
  { name: "Filip Lysiak", photo: "/uploads/filip.png", linkedin: "https://www.linkedin.com/in/filiplysiak/", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }
];

function Team() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { language } = useLanguage();
  const t = translations[language].team;
  const teamMembers = t.members.map((member, idx) => ({
    ...teamStaticConfig[idx],
    ...member
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <TeamSection id="team" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {t.title}
        </SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <GridCell key={member.name}>
                <TeamCard
                  variants={cardVariants}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3 }
                  }}
                >
                  <ProfileImageContainer>
                    <GradientBorder />
                    <ProfileImage
                      src={member.photo}
                      alt={member.name}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: 3,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </ProfileImageContainer>

                  <MemberName>{member.name}</MemberName>
                  <MemberTitle>{member.title}</MemberTitle>
                  
                  <SkillBadges>
                    {member.skills.map((skill, skillIndex) => (
                      <SkillBadge key={skillIndex}>{skill}</SkillBadge>
                    ))}
                  </SkillBadges>

                  <MemberBio>{member.bio}</MemberBio>

                  <SocialLinks>
                    <SocialLink
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={20} />
                    </SocialLink>
                  </SocialLinks>
                </TeamCard>
              </GridCell>
            ))}
          </TeamGrid>
        </motion.div>
      </Container>
    </TeamSection>
  );
}

export default Team;
