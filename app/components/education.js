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
        description_kr: '모바일 매체를 이해하고 인터랙티브 멀티미디어 콘텐츠 기획 및 제작 역량을 기릅니다. 기획부터 구현까지 앱 생태계 전 과정을 실습하여, 실무 중심의 창의적 인터페이스 디자인과 구현 능력을 배양합니다.',
        description_en: 'Explore mobile media and interactive content creation. Students master the full app planning and UI design process.'
      },
      {
        subject_kr: '컨셉과\n아이데이션',
        subject_en: 'Concept and Ideation',
        description_kr: '창의적 발상법과 콘셉트 도출 과정을 학습합니다. 다양한 아이데이션 기법으로 독창적 아이디어를 발굴하고 시각적 디자인으로 발전시킵니다. 토론과 발표를 통해 창의적 사고를 극대화하고 프로젝트 기획 기반을 다집니다.',
        description_en: 'Learn creative thinking and concept development. Use various ideation techniques to build unique visual designs and plans.'
      },
      {
        subject_kr: '미디어와\n기초코딩',
        subject_en: 'Media and Basic Coding',
        description_kr: '디지털 미디어 환경에 필요한 기초 프로그래밍 역량을 기릅니다. HTML과 CSS 문법을 익히고 웹 인터페이스를 구현합니다. 코딩의 두려움을 줄이고 디자인을 실제 웹 결과물로 완성하며 기술 융합 기본기를 다집니다.',
        description_en: 'Build foundational programming skills for digital media. Learn HTML and CSS to create functional web interfaces.'
      }
    ],
    sophomore_2: [
      {
        subject_kr: '디지털콘텐츠\n기획과 제작',
        subject_en: 'Digital Content Planning and Production',
        description_kr: '다양한 플랫폼용 디지털 콘텐츠의 기획, 제작, 배포 과정을 종합 학습합니다. 다중 매체를 결합한 스토리텔링 기법을 익힙니다. 트렌드와 사용자 리서치를 바탕으로 디지털 도구를 활용해 실무 중심 콘텐츠를 제작합니다.',
        description_en: 'Master the planning, production, and distribution of digital content. Learn multimedia storytelling using digital tools.'
      },
      {
        subject_kr: 'BX 디자인\n기초',
        subject_en: 'BX Design Basics',
        description_kr: '브랜드 경험 디자인의 핵심 개념을 이해하고, 소비자와의 접점에서 경험을 설계합니다. 브랜드 철학을 시각적 정체성으로 구현하며, 사례 분석과 실습을 통해 일관된 메시지를 전달하는 디자인 사고와 전략을 기릅니다.',
        description_en: 'Understand brand experience concepts to shape consumer touchpoints. Translate brand philosophy into visual identities.'
      },
      {
        subject_kr: '콘텐츠\n프로그래밍',
        subject_en: 'Content Programming',
        description_kr: '동적인 멀티미디어 콘텐츠 구현을 위한 심화 과정입니다. 자바스크립트를 활용해 사용자 입력에 반응하는 프론트엔드 능력을 기릅니다. 알고리즘과 데이터 처리를 익혀 기획한 디자인을 실제 코드로 완성하는 역량을 키웁니다.',
        description_en: 'Develop interactive content skills using JavaScript. Learn front-end development to implement design ideas into code.'
      }
    ],
    junior_1: [
      {
        subject_kr: '사용자\n경험과 AI',
        subject_en: 'User Experience and AI',
        description_kr: 'AI가 사용자 경험 디자인에 미치는 영향을 탐구하고 생성형 AI의 실무 활용법을 배웁니다. 디자이너 관점에서 AI 도구로 아이디어를 시각화하며, 맞춤형 경험 설계와 효율적인 워크플로우 구축 역량을 탄탄히 다집니다.',
        description_en: 'Explore AI\'s impact on UX design and use generative AI tools. Visualize ideas to build highly efficient workflows.'
      },
      {
        subject_kr: '디자인씽킹\n워크샵',
        subject_en: 'Design Thinking Workshop',
        description_kr: '사용자 중심 문제 해결 방법론인 디자인씽킹 과정을 실습합니다. 공감, 문제 정의, 아이디어 도출, 프로토타이핑을 직접 경험합니다. 리서치로 숨은 니즈를 파악해 실현 가능한 혁신적 해결책을 도출하는 역량을 기릅니다.',
        description_en: 'Practice the design thinking process. Discover user needs through research to create innovative and practical solutions.'
      },
      {
        subject_kr: '뉴미디어\n테크놀로지',
        subject_en: 'New Media Technology',
        description_kr: 'AR, VR 등 최신 뉴미디어 기술 흐름을 이해하고 콘텐츠 제작에 적용합니다. 기술 변화가 사용자 경험에 미치는 영향을 분석하고 몰입형 콘텐츠를 기획하며 미래 미디어 환경에 대한 통찰력과 활용 능력을 배양합니다.',
        description_en: 'Explore new media technologies like AR and VR. Analyze their UX impact and practice immersive content planning.'
      },
      {
        subject_kr: '모션\n타이포그래피',
        subject_en: 'Motion Typography',
        description_kr: '문자에 시공간성을 부여해 메시지 전달력을 극대화하는 모션 타이포그래피를 학습합니다. 애프터이펙트를 활용해 타이포 영상을 제작하며, 글자의 움직임과 리듬 제어로 정보 전달과 미적 완성도를 동시에 높이는 기법을 익힙니다.',
        description_en: 'Learn motion typography principles to maximize visual messaging. Use After Effects to control text movement and rhythm.'
      }
    ],
    junior_2: [
      {
        subject_kr: '서비스\n디자인',
        subject_en: 'Service Design',
        description_kr: '서비스를 고객 중심으로 기획하고 시각화하는 정성적 디자인 도구를 활용합니다. 고객 여정 지도와 심층 인터뷰로 핵심 문제를 정의하고, 사용자와 제공자 모두에게 실질적인 가치를 제공하는 혁신적인 해결책을 도출합니다.',
        description_en: 'Focus on customer-centered service design. Use journey maps to define problems and develop highly valuable solutions.'
      },
      {
        subject_kr: '디자인\n가이드',
        subject_en: 'UI Design Guide',
        description_kr: '디바이스 환경에 최적화된 UI 구축 가이드라인과 시스템 설계를 학습합니다. 타이포그래피와 컴포넌트 구조로 시각적 일관성 및 사용성을 높이며, 실질적인 디자인 시스템 구축 실습을 통해 실무 협업 역량을 탄탄히 강화합니다.',
        description_en: 'Learn UI guidelines and system design for various devices. Build design systems to improve consistency and usability.'
      },
      {
        subject_kr: '모션\n스토리텔링',
        subject_en: 'Motion Storytelling',
        description_kr: '영상에서 시간 흐름에 따라 메시지를 전달하는 모션 스토리텔링 기법을 배웁니다. 스토리보드, 애니메이션, 사운드를 결합해 몰입감 높은 서사를 구성하며, 세밀한 감정 전달과 시각적 메시지 표현 능력을 집중적으로 기릅니다.',
        description_en: 'Learn motion storytelling for video. Combine storyboards, animation, and sound to create highly immersive narratives.'
      }
    ],
    senior_1: [
      {
        subject_kr: '경험디자인\n프로젝트',
        subject_en: 'Experience Design Project',
        description_kr: 'UX/UI, 서비스 디자인, 브랜딩 방법론을 종합해 실무 수준의 프로젝트를 수행합니다. 리서치부터 사용성 테스트까지 전 과정을 경험하며, 팀 프로젝트로 복합적인 문제 해결 능력과 실전 협업 역량을 탄탄하게 강화합니다.',
        description_en: 'Execute a project integrating UX/UI, service design, and branding. Complete the full research and testing process.'
      },
      {
        subject_kr: 'BX와\n미디어',
        subject_en: 'BX and Media',
        description_kr: '미디어 환경에서 브랜드 경험이 전달되는 방식을 심도 있게 연구합니다. 온·오프라인 채널을 아우르는 통합적 브랜드 전략을 기획하고, 소비자의 상호작용을 분석해 최적의 미디어 커뮤니케이션 방안을 도출하는 실무 역량을 기릅니다.',
        description_en: 'Study how brand experiences are delivered across media. Plan integrated strategies and analyze consumer interactions.'
      }
    ],
    senior_2: [
      {
        subject_kr: 'UX 디자인\n스튜디오',
        subject_en: 'UX Design Studio',
        description_kr: '현업 수준의 UX 프로젝트를 수행합니다. 사용자 니즈를 반영한 서비스 기획 및 프로토타입 제작을 진행하며, 철저한 데이터 기반 검증을 거쳐 기획안을 다듬고 완성도 높은 실무 중심의 디자인 역량을 최종적으로 완성합니다.',
        description_en: 'Conduct professional UX projects by designing services and prototypes. Validate designs using rigorous data analysis.'
      },
      {
        subject_kr: 'BX 디자인\n스튜디오',
        subject_en: 'BX Design Studio',
        description_kr: '브랜드 기획부터 시각 시스템 구축, 매체 적용까지 BX 디자인 전 과정을 수행합니다. 아이덴티티 기반으로 일관된 통합 브랜드 경험을 설계하고, 실무 경쟁력을 입증할 수 있는 전략적인 디자인 포트폴리오를 최종 완성합니다.',
        description_en: 'Execute the BX design process from planning to media application. Design integrated experiences and build a portfolio.'
      }
    ]
  };
  const labDesc = {
    weird: [
      {
        subject_kr: 'Human-AI\nCollaborative Design',
        subject_en: '인간-AI 협업 디자인',
        description_kr: '인간과 AI가 협력하는 디자인 방법을 탐구합니다. 생성형 AI로 아이디어를 확장하고 인간의 창의성과 AI의 효율성을 결합합니다. 혁신적인 워크플로우를 구축하여 실무에 즉시 활용 가능한 강력한 협업 역량을 기릅니다.',
        description_en: 'Explore human-AI collaborative design. Combine human creativity with AI efficiency to build innovative design workflows.'
      },
      {
        subject_kr: 'Generative\nAI-Enabled Design',
        subject_en: '생성형 AI 기반 디자인',
        description_kr: '생성형 AI로 디자인 결과물을 기획 및 제작합니다. 텍스트, 이미지, 영상 생성 도구로 콘텐츠를 만들고 AI 디자인의 가능성과 한계를 분석합니다. 창의적인 결과물을 효율적으로 도출하는 실무 역량을 다집니다.',
        description_en: 'Focus on design using generative AI. Create multimedia content and analyze AI\'s potential to build efficient workflows.'
      },
      {
        subject_kr: 'UX/UI Design',
        subject_en: 'UX/UI 디자인',
        description_kr: '사용자 경험과 인터페이스 디자인의 원리와 실무를 학습합니다. 사용자 리서치, 정보 구조, 인터페이스 구성 등 UX/UI 전 과정을 경험하며 사용성과 심미성을 동시에 충족하는 수준 높은 디자인 역량을 기릅니다.',
        description_en: 'Learn core UX/UI principles and practices. Master user research, information architecture, and visual interface design.'
      },
      {
        subject_kr: 'Service Design',
        subject_en: '서비스 디자인',
        description_kr: '사용자 중심 서비스 설계를 위한 리서치 및 시각화 도구 활용법을 배웁니다. 고객 여정과 경험을 분석하고 핵심 문제를 정의하여 혁신적 솔루션을 도출합니다. 현업에 적용 가능한 실질적인 서비스 기획력을 강화합니다.',
        description_en: 'Focus on user-centered service design. Analyze customer journeys and define problems to create innovative solutions.'
      }
    ],

    a2f: [
      {
        subject_kr: 'Cognitive Design',
        subject_en: '인지 디자인',
        description_kr: '사용자의 인지 과정과 행동을 이해하고 디자인에 반영합니다. 지각, 기억, 주의 등 인지 심리 요소를 바탕으로 정보 전달 및 인터페이스 설계를 최적화합니다. 직관적이고 사용자 친화적인 디자인 구현 능력을 기릅니다.',
        description_en: 'Explore cognitive design principles. Understand how perception and memory affect users to create intuitive interfaces.'
      },
      {
        subject_kr: 'Design Thinking',
        subject_en: '디자인 씽킹',
        description_kr: '사용자 중심 문제 해결 방법론인 디자인 씽킹을 학습합니다. 공감, 문제 정의, 아이디어 도출, 프로토타이핑을 거쳐 창의적 해결책을 마련하고 실제 문제에 적용합니다. 실습과 협업을 중심으로 디자인 사고력을 강화합니다.',
        description_en: 'Learn design thinking as a problem-solving tool. Practice empathy and prototyping to create highly creative solutions.'

      },
      {
        subject_kr: 'Experience Strategy\nin Digital Contexts',
        subject_en: '디지털 맥락에서의 경험 전략',
        description_kr: '디지털 환경에 맞춰 사용자 경험을 전략적으로 설계합니다. 다양한 플랫폼과 접점에서 사용자 행동을 분석하고 일관된 경험 제공 전략을 수립합니다. 서비스와 브랜드의 핵심 가치를 높이는 통합 경험 설계 역량을 배양합니다.',
        description_en: 'Focus on experience strategy in digital environments. Analyze user behavior across platforms to design consistent UX.'

      },
      {
        subject_kr: 'Human-AI\nCo-Thinking in Design',
        subject_en: '인간-AI 디자인 공동 사고',
        description_kr: '인간과 AI가 함께 사고하며 문제를 해결하는 디자인 방식을 탐구합니다. AI를 협업 파트너로 삼아 아이디어를 발전시키고 복잡한 문제에 새롭게 접근합니다. 미래 지향적이고 융합적인 수준 높은 디자인 사고 역량을 다집니다.',
        description_en: 'Explore human-AI co-thinking in design. Use AI as a strategic partner to develop ideas and solve complex UX problems.'

      }
    ]
  };

  let [nowSubject, setNowSubject] = useState('');
  let [nowGraduate, setNowGraduate] = useState('');
  let [nowPopup, setNowPopup] = useState(false);
  let [graduatePopup, setGraduatePopup] = useState(false);

  const allSubjects = Object.values(curriculum).flat();
  const alllabDesc = Object.values(labDesc).flat();

  const matchedData = allSubjects.find(
    (subject) => subject.subject_kr === nowSubject
  );
  const matchedData2 = alllabDesc.find(
    (subject) => subject.subject_kr === nowGraduate
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setNowSubject('모바일 앱\n기획과 제작');
        setNowGraduate('Human-AI\nCollaborative Design');
      } else {
        setNowSubject('');
        setNowGraduate('');
        setNowPopup(false);
        setGraduatePopup(false);
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

    {graduatePopup && createPortal(
      <div 
        className='mobile_hamburger_background' 
        onClick={() => {setGraduatePopup(false); setNowGraduate('')}}
      >
        <div className={styles.undergraduate_popup_container} onClick={(e)=>e.stopPropagation()}>
          <div className={styles.undergraduate_content_subject_kr}>
            <div>{matchedData2?.subject_kr}</div>
            <div style={{cursor: 'pointer'}} onClick={() => {setGraduatePopup(false); setNowGraduate('')}}>
              <Close />
            </div>
          </div>
          <div className={styles.undergraduate_content_subject_en}>{matchedData2?.subject_en}</div>
          <div className={styles.undergraduate_content_description_kr}>{matchedData2?.description_kr}</div>
          <div className={styles.undergraduate_content_description_en}>{matchedData2?.description_en}</div>
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
          
        </div> : null
      }
      {
        category === 'Graduate' ?
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

            <div className={styles.undergraduate_container2}>
              <div className={styles.undergraduate_content_container2}>
                <div className={styles.undergraduate_content_container3}>
                  <div className={styles.undergraduate_content_year2}>Weird Lab</div>
                  <div className={styles.undergraduate_content_prof}>전우정 교수</div>
                </div>
                <div className={styles.undergraduate_content_subject_container2}>
                  {labDesc.weird.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject2} ${nowGraduate === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowGraduate(item.subject_kr); setGraduatePopup(true)}}>
                      <div>{item.subject_kr}</div>
                      <div className={styles.fd_en}>{item.subject_en}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.undergraduate_content_container2}>
                <div className={styles.undergraduate_content_container3}>
                  <div className={styles.undergraduate_content_year2}>A2F Lab</div>
                  <div className={styles.undergraduate_content_prof}>류안영 교수</div>
                </div>
                <div className={styles.undergraduate_content_subject_container2}>
                  {labDesc.a2f.map((item, index) => (
                    <div key={index} className={`${styles.undergraduate_content_subject2} ${nowGraduate === item.subject_kr ? styles.nowSubject : null}`} onClick={() => {setNowGraduate(item.subject_kr); setGraduatePopup(true)}}>
                      <div>{item.subject_kr}</div>
                      <div className={styles.fd_en}>{item.subject_en}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {matchedData2 ? (
              <div className={styles.undergraduate_non_popup_container}>
              <div className={styles.undergraduate_content_subject_kr}>{matchedData2?.subject_kr}</div>
              <div className={styles.undergraduate_content_subject_en}>{matchedData2?.subject_en}</div>
              <div className={styles.undergraduate_content_description_kr}>{matchedData2?.description_kr}</div>
              <div className={styles.undergraduate_content_description_en}>{matchedData2?.description_en}</div>
            </div> ) : (
              <div className={styles.undergraduate_non_popup_container}>설명 보려면 과목 선택해</div> )
            }
          </div>
        </div> : null
      }
    </div>
    </>
  )
}