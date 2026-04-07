'use client'

import styles from "../page.module.css";
import { useState } from "react";

export default function ResearchField() {

  let [nowShow, setNowShow] = useState('');
  const research_field = [
    {
      title: "프로덕트 디자이너",
      enTitle: "Product Designer",
      desc: "제품의 초기 기획, 디자인, 출시 후 개선까지 전체 사이클을 책임집니다. 비즈니스 목표와 사용자 니즈를 조율하며, 시각적 아름다움을 넘어 제품의 기능적 문제 해결과 전반적인 방향성을 이끕니다.",
      enDesc: "Oversees the entire product lifecycle from concept to launch. They balance business goals with user needs, driving functional problem-solving and overall direction beyond mere visual aesthetics."
    },
    {
      title: "사용자 경험 디자이너",
      enTitle: "UX Designer",
      desc: "사용자가 제품이나 서비스를 이용하며 느끼는 총체적인 경험을 설계합니다. 리서치와 데이터를 바탕으로 불편함을 찾아내고, 더 쉽고 만족스럽게 목적을 달성할 수 있도록 논리적인 흐름을 만듭니다.",
      enDesc: "Designs the overall experience a user has with a product. By leveraging research and data, they identify pain points and create logical, intuitive user flows to ensure user satisfaction and ease of use."
    },
    {
      title: "인터랙션 디자이너",
      enTitle: "Interaction Designer",
      desc: "사용자와 디지털 제품 또는 서비스 간의 상호작용을 설계합니다. 사용자가 목적을 쉽고 직관적으로 달성할 수 있도록 화면 흐름, 기기의 동작 방식, 시스템의 반응과 피드백을 논리적으로 구성합니다.",
      enDesc: "Designs interactions between users and digital products or services. They structure flows, behaviors, and feedback systems to help users achieve their goals intuitively and efficiently."
    },
    {
      title: "브랜드 경험 디자이너",
      enTitle: "BX Designer",
      desc: "고객이 브랜드와 만나는 온·오프라인의 모든 접점에서 일관된 메시지와 감정을 느끼도록 설계합니다. 브랜드의 철학이 실제 경험으로 이어지도록 여정을 기획합니다.",
      enDesc: "Shapes how customers perceive a brand across all online and offline touchpoints. They design cohesive journeys that translate a brand's philosophy into real-world experiences."
    },
    {
      title: "사용자 인터페이스 디자이너",
      enTitle: "UI Designer",
      desc: "사용자가 마주하는 디지털 화면의 시각적인 요소를 설계합니다. 타이포그래피, 색상, 아이콘, 레이아웃을 통해 브랜드 아이덴티티를 표현하고 정보 전달을 명확하게 합니다.",
      enDesc: "Designs the visual interface of digital products. Using typography, color, icons, and layout, they communicate brand identity and ensure clear information hierarchy."
    },
    {
      title: "브랜드 아이덴티티 디자이너",
      enTitle: "BI Designer",
      desc: "브랜드의 성격과 핵심 가치를 시각적 언어로 정의합니다. 로고, 컬러, 타이포그래피 등 디자인 시스템을 구축해 고유한 정체성을 만듭니다.",
      enDesc: "Defines a brand’s core personality through visual language. They build systems including logos, colors, and typography to establish a unique identity."
    },
    {
      title: "서비스디자인 전문가",
      enTitle: "Service Design Expert",
      desc: "무형의 서비스를 시각화하고 개선합니다. 사용자와 제공자 양쪽의 관점을 분석하여 효율적이고 매끄러운 서비스 경험과 시스템을 설계합니다.",
      enDesc: "Visualizes and improves intangible services. By analyzing both user and provider perspectives, they create efficient and seamless service systems."
    },
    {
      title: "UX 라이터",
      enTitle: "UX Writer",
      desc: "제품 내 텍스트를 사용자 친화적으로 설계합니다. 복잡한 정보를 간결하고 명확하게 전달하여 사용자가 쉽게 이해하고 행동할 수 있도록 돕습니다.",
      enDesc: "Crafts user-friendly product copy. They translate complex information into clear and concise language to guide user actions effectively."
    },
    {
      title: "AI 프로덕트 매니저",
      enTitle: "AI Product Manager",
      desc: "AI 기술을 활용한 제품을 기획하고 방향성을 이끕니다. 데이터와 모델을 이해하고 디자이너와 개발자 간 협업을 조율합니다.",
      enDesc: "Leads AI-driven products by aligning business goals, data, and technology. They coordinate between designers and developers to deliver AI-powered solutions."
    },
    {
      title: "디자인 연구원",
      enTitle: "Design Researcher",
      desc: "사용자 인터뷰와 테스트를 통해 숨은 니즈와 문제를 분석합니다. 데이터 기반 인사이트를 도출하여 UX/UI와 브랜드 전략에 반영합니다.",
      enDesc: "Conducts research through interviews and testing to uncover user needs. They provide data-driven insights to guide UX/UI and brand strategies."
    },
    {
      title: "디자인 전문 강사",
      enTitle: "Lecturer in Design",
      desc: "디자인 이론과 실무를 교육하고 커리큘럼을 설계합니다. 최신 트렌드와 기술을 반영하여 실무 역량을 갖춘 인재를 양성합니다.",
      enDesc: "Teaches design theory and practice while developing curricula. They prepare students with industry-relevant skills based on current trends."
    },
    {
      title: "디자인 공무원",
      enTitle: "Government Official for Design",
      desc: "공공디자인 정책을 기획하고 실행합니다. 도시 환경과 공공 시설 디자인을 개선하여 시민의 삶의 질을 향상시킵니다.",
      enDesc: "Plans and implements public design policies. They improve urban environments and public facilities to enhance citizens’ quality of life."
    }
  ];

  return (
    <div className={styles.research_mt}>
      {research_field.map((item, index) => (
        <div key={index} className={styles.research_container} onClick={() => nowShow === index ? setNowShow('') : setNowShow(index)}>
          <div className={styles.research_title_container}>
            <div className={styles.research_title_box}>
              <div className={nowShow === index ? styles.research_title : styles.research_title_hidden}>{item.title}</div>
              <div className={nowShow === index ? styles.research_title_en : styles.research_title_en_hidden}>{item.enTitle}</div>
            </div>
            
            <div className={nowShow === index ? styles.accordion_open : styles.accordion_closed}>
              <div className={styles.accordion_inner}>
                <div className={styles.research_desc}>
                  {item.desc}
                </div>
                <div className={styles.research_desc_en}>
                  {item.enDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}