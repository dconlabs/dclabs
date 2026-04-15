'use client'

import { createPortal } from 'react-dom';
import styles from './education.module.css'
import { useState, useEffect } from 'react'
import Close from './icons/close';

export default function Education() {

  let [category, setCategory] = useState('Undergraduate');

  const curriculum = {
    sophomore_1: [
      {
        subject_kr: '모바일 앱\n기획과 제작',
        subject_en: 'Mobile App Planning and Production',
        description_kr: '본 교과목은 스마트폰을 비롯한 다양한 모바일 매체의 특성을 이해하고, 멀티미디어 콘텐츠를 기획 및 제작하는 기초 역량을 기르는 것을 목표로 합니다. 특히 사용자와 상호작용할 수 있는 인터랙티브 콘텐츠 제작에 필수적인 지식과 실무 기능을 체계적으로 학습합니다. 학생들은 기획부터 실제 제작에 이르는 전 과정을 직접 경험함으로써 모바일 앱 생태계에 대한 이해도를 높이고, 창의적인 모바일 인터페이스 디자인 및 구현 능력을 배양하게 됩니다.',
        description_en: 'This course aims to understand the characteristics of various mobile media, including smartphones, and cultivate basic capabilities in planning and producing multimedia content. In particular, it systematically teaches the knowledge and practical skills essential for creating interactive content that can interact with users. By directly experiencing the entire process from planning to actual production, students will increase their understanding of the mobile app ecosystem and develop creative mobile interface design and implementation skills.'
      },
      {
        subject_kr: '컨셉과\n아이데이션',
        subject_en: 'Concept and Ideation',
        description_kr: '성공적인 디자인과 콘텐츠 제작의 출발점인 창의적 발상법과 콘셉트도 과정을 심도 있게 학습합니다. 다양한 아이데이션 기법을 통해 임상적인 문제나 특정 주제로부터 독창적인 아이디어를 발굴하고, 이들 시각적이고 논리적인 형태의 디자인 콘셉트로 발전시키는 방법을 훈련합니다. 브레인스토밍, 마인드맵 기초적인 방법론부터 시작하여 그룹 토론과 발표를 거치며 학생 개개인의 창의적 사고 역량을 극대화하고, 향후 프로젝트 기획에 필요한 기반을 다집니다.',
        description_en: 'This course explores creative thinking methods and concept derivation processes, which are the starting points of successful design and content production. Through various ideation techniques, students discover original ideas from specific problems or topics and train to develop them into visual and logical design concepts. Starting with basic methodologies like brainstorming and mind mapping, through group discussions and presentations, students maximize their individual creative thinking capabilities and lay the foundation necessary for future project planning.'
      },
      {
        subject_kr: '미디어와\n기초코딩',
        subject_en: 'Media and Basic Coding',
        description_kr: '디지털 미디어 환경에서 필수적으로 요구되는 기초적인 프로그래밍 역향을 함양하는 과정입니다. 웹 제작의 핵심 언어인 HTML과 CSS의 구조와 문법을 집중적으로 학습하며, 이를 바탕으로 웹사이트 기반의 인터페이스 디자인을 개발하고 구현하는 데 필요한 지식과 기능을 익힙니다. 코딩에 대한 두려움을 없애고, 기획한 디자인 상에서 실제로 동작하는 결과물로 완성해보는 경험을 통해 디자인과 기술을 융합할 수 있는 창작자로서의 기본기를 탄탄하게 다집니다.',
        description_en: 'This is a course designed to cultivate basic programming skills essential in the digital media environment. It intensively studies the structure and grammar of HTML and CSS, the core languages of web production, and based on this, teaches the knowledge and functions needed to develop and implement website-based interface design. By eliminating the fear of coding and experiencing the completion of a planned design into a working result, students build a solid foundation as creators who can fuse design and technology.'
      }
    ],
    sophomore_2: [
      {
        subject_kr: '디지털콘텐츠\n기획과 제작',
        subject_en: 'Digital Content Planning and Production',
        description_kr: '급변하는 디지털 환경에 맞춰 다양한 플랫폼에서 활용 가능한 디지털 콘텐츠의 기획부터 제작, 배포까지의 전 과정을 종합적으로 학습합니다. 텍스트, 이미지, 영상, 오디오 등 다중 매체를 결합하여 사용자에게 효과적으로 메시지를 전달할 수 있는 콘텐츠 스토리텔링 기법을 연구합니다. 트랜드 분식과 타겟 사용자 리서치를 바탕으로 실질적인 콘텐츠 기획안을 작성하고, 각종 디지털 등을 활용해 결과물을 직접 제작해보며 실무 중심의 콘텐츠 크리에이팅 능력을 배양합니다.',
        description_en: 'In response to the rapidly changing digital environment, this course comprehensively covers the entire process from planning to production and distribution of digital content applicable across various platforms. Students study content storytelling techniques that effectively deliver messages to users by combining multiple media such as text, images, video, and audio. Based on trend analysis and target user research, students write practical content proposals and directly produce results using various digital tools, cultivating practical content creation abilities.'
      },
      {
        subject_kr: 'BX 디자인\n기초',
        subject_en: 'BX Design Basics',
        description_kr: '브랜드 경합 디자인의 핵심 개념과 기초 원리를 이해하고, 소비자가 브핸드와 맺는 모든 접점에서의 경험을 설계하는 발법을 학습합니다. 브랜드의 철학과 가치를 시각적인 정체성으로 구체화하는 것을 넘어, 서비스, 제품, 환경 등 다각적인 측면에서 일관된 브랜드 메시지를 전달하는 전략을 연구합니다. 성공적인 BX 디자인 사례 분석과 실습을 통해 브랜드와 사용자 간의 긍정적인 관계를 형성하고 가치를 극대화하는 디자인 사고를 기릅니다.',
        description_en: 'Students understand the core concepts and basic principles of brand experience (BX) design and learn methods to design experiences at all touchpoints between consumers and brands. Going beyond materializing a brand\'s philosophy and values into a visual identity, the course researches strategies to deliver consistent brand messages across various aspects such as services, products, and environments. Through case analysis and practical exercises of successful BX design, students develop design thinking to form positive relationships between brands and users and maximize value.'
      },
      {
        subject_kr: '콘텐츠\n프로그래밍',
        subject_en: 'Content Programming',
        description_kr: '이전 학기에서 배운 기초 지식을 바탕으로, 인터렉티브하고 동적인 멀티미디어 콘텐즈를 구현하기 위한 심화 과정을 학습합니다. 특히 자바스크립트를 주력 언어로 다루며, 사용자의 입력에 반응하고 시각적 효과를 극대화하는 수준 높은 프론트엔드 개발 능력을 기릅니다. 논리적 알고리즘 설계와 데이터 처리 방법을 익히, 본인이 기획한 디자인적 직관을 실제 코드로 유연하게 구현할 수 있는 차세대 디지털 콘텐츠 크리에이터로서의 역량을 강화합니다.',
        description_en: 'Building on the basic knowledge learned in the previous semester, this course provides advanced learning to implement interactive and dynamic multimedia content. In particular, it focuses on JavaScript as the primary language, cultivating high-level front-end development skills that respond to user input and maximize visual effects. By learning logical algorithm design and data processing methods, students strengthen their capabilities as next-generation digital content creators who can flexibly implement their planned design intuition into actual code.'
      }
    ],
    junior_1: [
      {
        subject_kr: '사용자\n경험과 AI',
        subject_en: 'User Experience and AI',
        description_kr: 'AI 기술이 사용자 경험 디자인에 미치는 영향을 탐구하고, 생성형 AI를 디자인 기획에 적극 활용하는 방법을 학습합니다. 개발이나 엔지니어링 관점이 아닌, 순수한 디자이너의 시각에서 AI 도구를 활용해 아이디어 도출하고 시각화하는 과정을 경험합니다. 학생들은 AI가 제공하는 새로운 가능성을 바탕으로 사용자 맞춤형 경험을 설계하고, 효율적이면서도 창의적인 디자인 워크플로우를 구축하여 미래 지향적인 UX/UI 기획 역량을 기름니다.',
        description_en: 'This course explores the impact of AI technology on user experience design and teaches how to actively utilize generative AI in design planning. Rather than from a development or engineering perspective, students experience the process of deriving and visualizing ideas using AI tools from a pure designer\'s point of view. Based on the new possibilities provided by AI, students design customized user experiences and build efficient yet creative design workflows, cultivating future-oriented UX/UI planning capabilities.'
      },
      {
        subject_kr: '디자인씽킹\n워크샵',
        subject_en: 'Design Thinking Workshop',
        description_kr: '사용자 중심의 창의적 문제 해결 방법론인 디자인씽킹의 전 과정을 실두 워크샵 형태로 깊이 있게 실습합니다. 디자인 사고 역량을 기르기 위해 필수적인 디자인 리서치 방법 학습과 활동을 진행하며 공감, 문제 정의, 아이디어 도출, 프로토타이핑 단계를 직접 경험합니다. 데스크 리서지, 심층 인터뷰 등 다양한 조사 기법을 통해 사용자의 숨겨진 니즈를 파악하고, 이를 바탕으로 혁신적이고 실현 가능한 디자인 솔루션을 도출하는 능력을 키듭니다.',
        description_en: 'Students deeply practice the entire process of design thinking, a user-centered creative problem-solving methodology, in a workshop format. To develop design thinking skills, essential design research methods and activities are conducted, and students directly experience the stages of empathy, problem definition, ideation, and prototyping. Through various research techniques such as desk research and in-depth interviews, students identify users\' hidden needs and develop the ability to derive innovative and feasible design solutions based on this.'
      },
      {
        subject_kr: '뉴미디어\n테크놀로지',
        subject_en: 'New Media Technology',
        description_kr: 'AR, VR, XR, 메타버스 등 새롭게 등장하는 최신 뉴미디어 기술의 동향을 파악하고, 이를 디자인 및 콘텐츠 제작에 응용하는 방법을 탐구합니다. 새로운 기술 플랫폼이 가져올 미디어 환경의 변화와 사용자 삼호작용의 미래를 예측하며, 첨단 기술을 활용한 새로운 형태의 몰입형 콘텐츠 기획을 실습합니다. 기술과 예술, 디자인의 경계를 넘나드는 융합적 사고를 바탕으로, 미래 미디어 산업을 선도할 수 있는 테크놀로지 활용 능력과 통찰력을 배양합니다.',
        description_en: 'This course identifies the trends of newly emerging new media technologies such as AR, VR, XR, and the Metaverse, and explores how to apply them to design and content production. It predicts the changes in the media environment and the future of user interaction brought about by new technology platforms, and practices planning new forms of immersive content using cutting-edge technologies. Based on convergent thinking that crosses the boundaries of technology, art, and design, students cultivate technology utilization skills and insights to lead the future media industry.'
      },
      {
        subject_kr: '모션\n타이포그래피',
        subject_en: 'Motion Typography',
        description_kr: '정적인 문자에 시간성과 공간성을 부여하여 시각적 메시지 전달력을 극대화하는 모션 타이포그래피의 원리와 기법을 학습합니다. 애프터이펙트를 핵심 홀로 활용하여, 타이포그래피 디자인이 중심이 되는 감각적인 영상 콘텐츠를 기획하고 제작하는 실습 위주의 수업입니다. 글자의 움직임, 속도, 리듬감을 세밀하게 제어하는 방법을 익혀 정보 전달의 효물성과 이적 완성도를 동시에 충족하는 타이틀 및 모션 포스터를 완성합니다.',
        description_en: 'Students learn the principles and techniques of motion typography, which maximizes visual message delivery by adding temporality and spatiality to static text. It is a practice-oriented class that plans and produces sensible video content centered on typography design, using After Effects as the core tool. By learning how to finely control the movement, speed, and rhythm of letters, students complete titles and motion posters that simultaneously satisfy the efficiency of information delivery and aesthetic perfection.'
      }
    ],
    junior_2: [
      {
        subject_kr: '서비스\n디자인',
        subject_en: 'Service Design',
        description_kr: '눈에 보이지 않는 서비스를 고객 중심으로 기획하고 시각화하기 위해 다양한 정성적인 디자인 도구를 적극 활용하는 수업입니다. 고객 여정 지도, 심층 인터뷰, 새도임 등 서비스 디자인 고유의 방법론을 통해 문제가 무엇인지 탐구하고 찾아냅니다. 이를 바탕으로 사용자와 서비스 제공자 모두에게 긍정적인 가치를 창출할 수 있는 창의적이고 혁신적인 해결책을 도출하고 제안하는 실무 기획력을 기릅니다.',
        description_en: 'This is a class that actively utilizes various qualitative design tools to plan and visualize invisible services in a customer-centric way. Through service design-specific methodologies such as customer journey maps, in-depth interviews, and shadowing, students explore and identify what the problems are. Based on this, they develop practical planning skills to derive and propose creative and innovative solutions that can create positive value for both users and service providers.'
      },
      {
        subject_kr: '디자인\n가이드',
        subject_en: 'UI Design Guide',
        description_kr: '다양한 디지털 디바이스 환경에 최적화된 사용자 인터페이스(UI) 구축하기 위한 체계적인 가이드라인 설계 및 시스템화 방법을 심도 있게 다룹니다. 타이포그래피, 컬러 시스템, 아이코노그래피, 컴포넌트 구조 등 이를 구성하는 필수 요소들의 시각적 일관성을 유지하고 사용성을 높이는 디자인 원칙을 학습합니다. 최신 디자인 협업 들을 활용하여 디자인 시스템을 직접 구축해 봄으로써 실무 개발 환경에서의 효율적인 소통 방식과 재계적인 에셋 관리 역량을 강화합니다.',
        description_en: 'This course deeply covers systematic guideline design and systematization methods for building user interfaces (UI) optimized for various digital device environments. Students learn design principles that maintain visual consistency and enhance usability of essential components such as typography, color systems, iconography, and component structures. By directly building a design system using the latest design collaboration tools, students strengthen efficient communication methods and systematic asset management capabilities in practical development environments.'
      },
      {
        subject_kr: '모션\n스토리텔링',
        subject_en: 'Motion Storytelling',
        description_kr: '단순한 시각적 움직임을 넘어, 영상 미디어 내에서 시간의 흐름에 따라 내러티브를 효과적으로 전달하는 모션 스토리텔링 기법을 학습합니다. 영상 언어의 문법과 구조를 이해하고, 캐릭터, 배경, 모션 그래픽 요소들을 유기적으로 결합하여 몰입감 있는 서사를 구성하는 방법을 훈편합니다. 스토리보드 기획부터 키프레임 애니메이션, 화면 전환 기법, 사운드 디자인의 조화까지 전체적인 워크플로우를 경험하며, 감정을 용직이고 메시지를 명확히 전달하는 창작 능력을 기듭니다.',
        description_en: 'Moving beyond simple visual movements, students learn motion storytelling techniques that effectively convey narratives over time within video media. They understand the grammar and structure of video language and train in methods to construct immersive narratives by organically combining characters, backgrounds, and motion graphic elements. Experiencing the entire workflow from storyboard planning to keyframe animation, scene transition techniques, and the harmony of sound design, students develop the creative ability to move emotions and clearly deliver messages.'
      }
    ],
    senior_1: [
      {
        subject_kr: '경험디자인\n프로젝트',
        subject_en: 'Experience Design Project',
        description_kr: '그동안 학습한 UX/UI, 서비스 디자인, 브랜딩 등 다양한 디자인 방법론을 총망라하여 실제 산업 현장에서 요구하는 수준의 종합적인 경험디자인 프로젝트를 수행합니다. 학생들은 스스로 사회적 문제나 시장의 기회를 발굴하고, 사용자 리서치부터 문제 정의, 프로토타이핑, 사용성 테스트에 이르는 전 과정을 주도적으로 진행합니다. 실무 중심의 밀도 있는 팀 프로젝트와 피드백을 통해 완성도 높은 포트폴리오를 제작하며, 예비 디자이너로서의 문제 해결 능력과 협업 역량을 검증합니다.',
        description_en: 'Encompassing various design methodologies learned so far, such as UX/UI, service design, and branding, students conduct comprehensive experience design projects at a level required by the actual industry field. Students independently discover social problems or market opportunities and proactively proceed with the entire process from user research to problem definition, prototyping, and usability testing. Through intensive, practice-oriented team projects and feedback, students produce high-quality portfolios and verify their problem-solving and collaboration skills as prospective designers.'
      },
      {
        subject_kr: 'BX와\n미디어',
        subject_en: 'BX and Media',
        description_kr: '현대 사회의 복잡한 미디어 환경 속에서 브랜드 경험(BX)이 다양한 채널을 통해 어떻게 전달되고 확장되는지 심층적으로 연구합니다. 디지, 소설, 오프라인 공간 등 각 미디어 매체의 특성을 분석하고 다매체 환경에 최적화된 통합적인 브랜드 커뮤니케이션 전략을 기휘합니다. 미디어 기술의 발전이 브랜드와 소비자의 상호작용 방식에 미치는 영향을 고찰하며, 온-오프라인을 넘나드는 브랜딩 캠페인을 설계해 봄으로써 실무적인 브랜드 매니지먼트 역량과 전략적 사고를 함양합니다.',
        description_en: 'In the complex media environment of modern society, this course conducts in-depth research on how brand experience (BX) is delivered and expanded through various channels. It analyzes the characteristics of each media outlet, such as digital, social, and offline spaces, and plans integrated brand communication strategies optimized for a multi-media environment. Considering the impact of media technology advancement on the interaction between brands and consumers, students cultivate practical brand management capabilities and strategic thinking by designing branding campaigns that cross online and offline realms.'
      }
    ],
    senior_2: [
      {
        subject_kr: 'UX 디자인\n스튜디오',
        subject_en: 'UX Design Studio',
        description_kr: '학부 과정의 대미를 장식하는 심화 스튜디오 수업으로, 현업 디자이너 수준의 전문적이고 혁신적인 사용자 경험(UX) 프로젝트를 주도적으로 진행합니다. 최신 기술 동향과 복잡한 사용자 니즈를 반영하여 고도화된 디지털 서비스 및 프로덕트를 기획하고, 실제 구현 가능한 수준의 하이파이 프로토타입을 완성하는 것을 목표로 합니다. 철저한 데이터 기빈 검증과 사용성 평가를 거치며 실무 투입 시 즉각적인 성과를 낼 수 있는 최고 수준의 UX 실무 능력을 구축합니다.',
        description_en: 'As an advanced studio class that crowns the undergraduate program, students proactively lead professional and innovative user experience (UX) projects at the level of working designers. The goal is to plan advanced digital services and products reflecting the latest technology trends and complex user needs, and to complete hi-fi prototypes at a practically implementable level. Through rigorous data-based verification and usability evaluation, students build the highest level of UX practical skills capable of yielding immediate results when deployed in the field.'
      },
      {
        subject_kr: 'BX 디자인\n스튜디오',
        subject_en: 'BX Design Studio',
        description_kr: '브랜드 기획부터 시각 시스템 구축, 매체별 응용 애플리케이션 디자인까지 브랜드 경험 디자인의 전 과정을 집대성하는 최고위 실무 스튜디오 과정입니다. 가상의 브랜드 론칭 또는 기존 브랜드의 리뉴얼 프로젝트를 기획하며, 브랜드 아이덴티티를 기반으로 공간, 패키지, 디지털 접점 등 디차원적인 브랜드 경험 요소를 일관성 있게 통합 설계합니다. 시장과 소비자에 대한 통찰력을 바탕으로 독창적이고 전략적인 BX 포트폴리오를 완성하여 전문가로서의 자질을 증명합니다.',
        description_en: 'This is the highest-level practical studio course that synthesizes the entire process of brand experience design, from brand planning to visual system construction and applied application design by medium. Planning a virtual brand launch or an existing brand\'s renewal project, students consistently and integratively design multi-dimensional brand experience elements such as space, packages, and digital touchpoints based on brand identity. Based on insights into the market and consumers, students complete original and strategic BX portfolios to prove their qualifications as professionals.'
      }
    ]
  };
  let [nowSubject, setNowSubject] = useState('');
  let [nowPopup, setNowPopup] = useState(false);

  const allSubjects = Object.values(curriculum).flat();

  const matchedData = allSubjects.find(
    (subject) => subject.subject_kr === nowSubject
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 450) {
        setNowSubject('모바일 앱\n기획과 제작');
      } else {
        setNowSubject('');
        setNowPopup(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    {nowPopup && createPortal(
      <div 
        className='mobile_hamburger_background' 
        onClick={() => {setNowPopup(false); setNowSubject('')}} 
        style={{backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',}}
      >
        <div className={styles.undergraduate_popup_container} onClick={(e)=>e.stopPropagation()}>
          <div className={styles.undergraduate_content_subject_kr}>
            <div>{matchedData?.subject_kr}</div>
            <div style={{cursor: 'pointer'}} onClick={() => {setNowPopup(false); setNowSubject('')}}>
              <Close />
            </div>
          </div>
          <div className={styles.undergraduate_content_subject_en}>{matchedData?.subject_en}</div>
          <div className={styles.undergraduate_content_description_kr}>{matchedData?.description_kr}</div>
          <div className={styles.undergraduate_content_description_en}>{matchedData?.description_en}</div>
        </div>
      </div>, document.body
    )}

    <div className={styles.curriculum_container}>

      <div className={styles.category_container}>
        {['Undergraduate', 'Graduate'].map((item) => (
          <div key={item} className={`${styles.category} ${category === item ? styles.nowCategory : styles.notNowCategory}`} onClick={() => setCategory(item)}>{item}</div>
        ))}
      </div>
      {
        category === 'Undergraduate' ?
        <div>
          <div className={styles.undergraduate_title_container}>
            <div className={styles.undergraduate_title_kr}>
              UX/BX 디자인부터 뉴미디어 테크놀로지까지, 사용자 중심의 혁신적인 멀티미디어 생태계를 이끌어갑니다.
            </div>
            <div className={styles.undergraduate_title_en}>
              From UX/BX design to new media technology, we lead an innovative, user-centric multimedia ecosystem.
            </div>
          </div>

          <div className={styles.undergraduate_container_origin}>

            <div className={styles.undergraduate_container}>
              <div className={styles.undergraduate_content_container}>
                <div className={styles.undergraduate_content_year}>2-1</div>
                <div className={styles.undergraduate_content_subject_container}>
                  {curriculum.sophomore_1.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject} ${nowSubject === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowSubject(item.subject_kr); setNowPopup(true)}}>
                      <div>{item.subject_kr}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.undergraduate_content_container}>
                <div className={styles.undergraduate_content_year}>2-2</div>
                <div className={styles.undergraduate_content_subject_container}>
                  {curriculum.sophomore_2.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject} ${nowSubject === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowSubject(item.subject_kr); setNowPopup(true)}}>
                      <div>{item.subject_kr}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.undergraduate_content_container}>
                <div className={styles.undergraduate_content_year}>3-1</div>
                <div className={styles.undergraduate_content_subject_container}>
                  {curriculum.junior_1.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject} ${nowSubject === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowSubject(item.subject_kr); setNowPopup(true)}}>
                      <div>{item.subject_kr}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.undergraduate_content_container}>
                <div className={styles.undergraduate_content_year}>3-2</div>
                <div className={styles.undergraduate_content_subject_container}>
                  {curriculum.junior_2.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject} ${nowSubject === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowSubject(item.subject_kr); setNowPopup(true)}}>
                      <div>{item.subject_kr}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.undergraduate_content_container}>
                <div className={styles.undergraduate_content_year}>4-1</div>
                <div className={styles.undergraduate_content_subject_container}>
                  {curriculum.senior_1.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject} ${nowSubject === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowSubject(item.subject_kr); setNowPopup(true)}}>
                      <div>{item.subject_kr}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.undergraduate_content_container}>
                <div className={styles.undergraduate_content_year}>4-2</div>
                <div className={styles.undergraduate_content_subject_container}>
                  {curriculum.senior_2.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject} ${nowSubject === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowSubject(item.subject_kr); setNowPopup(true)}}>
                      <div>{item.subject_kr}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {matchedData ? (
              <div className={styles.undergraduate_non_popup_container}>
              <div className={styles.undergraduate_content_subject_kr}>{matchedData?.subject_kr}</div>
              <div className={styles.undergraduate_content_subject_en}>{matchedData?.subject_en}</div>
              <div className={styles.undergraduate_content_description_kr}>{matchedData?.description_kr}</div>
              <div className={styles.undergraduate_content_description_en}>{matchedData?.description_en}</div>
            </div> ) : (
              <div className={styles.undergraduate_non_popup_container}>설명 보려면 과목 선택해</div> )
            }

          </div>
          
        </div> :
        <div>

          <div className={styles.undergraduate_title_container}>
            <div className={styles.undergraduate_title_kr}>
              AI 융합 디자인을 실험하는 Weird Lab과 인지적 경험 전략을 고찰하는 A2F Lab, 두 연구실의 고유한 전문성을 바탕으로 미래 디지털 환경의 본질을 깊이 있게 탐구해 나갑니다.
            </div>
            <div className={styles.undergraduate_title_en}>
              Drawing on the unique expertise of Weird Lab in AI-converged design and A2F Lab in cognitive experience strategies, we deeply explore the essence of future digital environments.
            </div>
          </div>

          <div className={styles.undergraduate_container_origin}>
            개발중...
          </div>

        </div>
      }
    </div>
    </>
  )
}