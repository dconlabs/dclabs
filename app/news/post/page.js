'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Header from "@/app/components/header";
import styles from "../[id]/detail.module.css";
import Back from "@/app/components/icons/back";
import Link from "next/link";

export default function Post() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [group, setGroup] = useState("Notice");
  const [uploadDate, setUploadDate] = useState("");
  const [uploader, setUploader] = useState("");
  const [contents, setContents] = useState("");
  const [source, setSource] = useState("dclabs");

  let categoryList = ["Notice", "Event", "Publication", "Others"]

  // 1. 파일 관리를 위한 상태 (여기가 핵심!)
  // previews: 보여줄 이미지 URL들
  // selectedFiles: 실제 서버로 보낼 파일 객체들
  const [previews, setPreviews] = useState([]); 
  const [selectedFiles, setSelectedFiles] = useState([]); 

  const inputFileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false); 
  const [isDragging, setIsDragging] = useState(false); 

  // ---------------------------------------------------------
  // [삭제 기능] 특정 인덱스의 이미지와 파일을 제거
  // ---------------------------------------------------------
  const removeImage = (indexToRemove) => {
    // 1. 미리보기 URL 제거
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    
    // 2. 실제 전송할 파일 목록에서 제거
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));

    // (선택사항) 메모리 누수 방지를 위해 URL 해제
    URL.revokeObjectURL(previews[indexToRemove]);
  };

  // ---------------------------------------------------------
  // [파일 처리] 드래그나 클릭으로 들어온 파일을 상태에 추가
  // ---------------------------------------------------------
  const processFiles = (files) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    // 기존 목록 뒤에 이어 붙이기 (여러 번 나눠서 추가 가능하게 함)
    setPreviews((prev) => [...prev, ...newPreviews]);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    processFiles(e.target.files);
    // 같은 파일을 다시 선택할 수 있도록 input 초기화
    e.target.value = ''; 
  };

  // ---------------------------------------------------------
  // [제출] selectedFiles 배열을 사용하여 업로드
  // ---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !contents || !group || !uploadDate || !uploader) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    setIsUploading(true); 

    try {
      let finalImageUrls = [];

      // A. selectedFiles 상태에 있는 파일들을 업로드
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: 'POST',
            body: file,
          });
          return response.json();
        });

        const results = await Promise.all(uploadPromises);
        finalImageUrls = results.map((result) => result.url);
        
        console.log("업로드 된 이미지들:", finalImageUrls);
      }

      // B. 텍스트 + 이미지 URL 저장
      const res = await axios.post("/api/admin", { 
        title, 
        enTitle,
        uploadDate,
        uploader,
        group,
        contents, 
        source,
        images: finalImageUrls
      });

      if (res.data.ok) {
        alert("등록되었습니다.");
        router.push("/");
      } else {
        alert("작성 권한이 없습니다.");
      }

    } catch (error) {
      console.error(error);
      alert("업로드에 실패했습니다. 작성 권한이 없거나 관리자로 로그인 하십시오.");
    } finally {
      setIsUploading(false); 
    }
  }

  // 드래그 앤 드롭 이벤트 핸들러들
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDateChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 6);

    let year = value.slice(0, 4);
    let month = value.slice(4, 6);

    if (month.length === 1) {
      if (parseInt(month) > 1) {
        month = "0" + month;
      }
    }

    if (month.length === 2) {
      let monthNum = parseInt(month);

      if (monthNum === 0) month = "01";
      if (monthNum > 12) month = "12";
    }

    if (month.length > 0) {
      value = `${year}.${month}`;
    } else {
      value = year;
    }
    setUploadDate(value);
  };

  return (
    <div>
      <Header/>
      
      <div className={styles.detail_container}>

        <Link href="/"><Back/></Link>

        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <input 
              type="text" 
              placeholder="한글 제목"
              onChange={(e) => setTitle(e.target.value)}
              className={styles.title}
              style={{fontFamily:'pretendard', background:'none', border:'none', outline:'none', color:'#FFF'}}
            />
            <input 
              type="text" 
              placeholder="영문 제목"
              onChange={(e) => setEnTitle(e.target.value)}
              className={styles.enTitle}
              style={{fontFamily:'pretendard', background:'none', border:'none', outline:'none', color:'#FFF'}}
            />
            <div>

              <div className={styles.category_container}>
              {
                categoryList.map((item, index)=>{
                  return (
                    <div key={index} onClick={() => setGroup(item)} className={group === item ? styles.category_item_active : styles.category_item}>
                      {item}
                    </div>
                  )
                })
              }
              </div>

            </div>
            <div className={styles.date_container}>
              <input 
                type="text" 
                placeholder="예:2000.12"
                value={uploadDate}
                onChange={handleDateChange}
                className={styles.date_form_style}
              />
              <div>|</div>
              <input 
                type="text" 
                placeholder="작성자"
                onChange={(e) => setUploader(e.target.value)}
                className={styles.date_form_style}
              /> 씀</div>
              <textarea 
                placeholder="내용"
                onChange={(e) => setContents(e.target.value)}
                className={styles.content}
                style={{height:'160px', resize:'none', fontFamily:'pretendard', background:'none', border:'none', outline:'none', color:'#FFF'}}
              />
              <button 
                onClick={handleSubmit} 
                disabled={isUploading}
                className={styles.submit_btn}
                style={{ 
                  backgroundColor: isUploading ? '#ccc' : '#444', 
                  cursor: isUploading ? 'not-allowed' : 'pointer'
                }}
              >
                {isUploading ? '뉴스 업로드 중...' : '뉴스 등록하기'}
              </button>
          </div>

          <div className={styles.img_container}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputFileRef.current.click()}
              className={styles.drop_field}
              style={{
                border: isDragging ? '1px solid #fff' : '1px dashed #888',
                backgroundColor: isDragging ? '#333' : '#222',
              }}
            >
              <div>이미지 드래그 앤 드롭</div>
              <div>또는 클릭하여 선택</div>
            </div>

            <input 
              ref={inputFileRef} 
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {previews.length > 0 && (
              <div className={styles.pro_detail_content_container}>
                {previews.map((url, index) => (
                  <div key={index} className={styles.pro_detail_img_container2}>
                    <img src={url}/>
                    <button onClick={() => removeImage(index)} className={styles.delete_btn}>X</button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}