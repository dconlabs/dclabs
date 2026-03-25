'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Link from "next/link";
import styles from "../../[id]/detail.module.css";
import Header from "@/app/components/header";
import Back from "@/app/components/icons/back";

export default function EditForm({ post }) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [enTitle, setEnTitle] = useState(post.enTitle);
  const [group, setGroup] = useState(post.group);
  const [uploadDate, setUploadDate] = useState(post.uploadDate);
  const [uploader, setUploader] = useState(post.uploader);
  const [contents, setContents] = useState(post.contents);
  const [source, setSource] = useState(post.source);

  let categoryList = ["Notice", "Event", "Publication", "Others"]

  // existingImages: 서버에 이미 올라가 있는 이미지 URL들
  const [existingImages, setExistingImages] = useState(post.images || []);
  
  // newFiles: 새로 추가하려는 로컬 파일 객체들 (아직 업로드 전)
  const [newFiles, setNewFiles] = useState([]); 
  // newPreviews: 새로 추가한 파일의 미리보기 URL
  const [newPreviews, setNewPreviews] = useState([]);

  const inputFileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // A. 기존 이미지 삭제 (화면에서만 안 보이게 처리, 실제 삭제는 수정 완료 시 또는 별도 API로)
  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // B. 새로 추가한 이미지 삭제
  const removeNewFile = (indexToRemove) => {
    setNewPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setNewFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    URL.revokeObjectURL(newPreviews[indexToRemove]); // 메모리 해제
  };

  const processFiles = (files) => {
    if (!files || files.length === 0) return;

    const addedFiles = Array.from(files);
    const addedPreviews = addedFiles.map((file) => URL.createObjectURL(file));

    setNewPreviews((prev) => [...prev, ...addedPreviews]);
    setNewFiles((prev) => [...prev, ...addedFiles]);
  };

  const handleFileChange = (e) => {
    processFiles(e.target.files);
    e.target.value = ''; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let newUploadedUrls = [];

      // 1. 새로 추가된 파일이 있다면 Vercel Blob에 업로드
      if (newFiles.length > 0) {
        const uploadPromises = newFiles.map(async (file) => {
          const response = await fetch(`/api/upload?filename=${file.name}&folder=uploads`, {
            method: 'POST',
            body: file,
          });
          return response.json();
        });

        const results = await Promise.all(uploadPromises);
        newUploadedUrls = results.map((res) => res.url);
      }

      // 2. [기존 유지된 이미지] + [새로 업로드된 이미지] 합치기
      const finalImages = [...existingImages, ...newUploadedUrls];

      // 3. DB 업데이트 요청 (PUT)
      const res = await axios.put("/api/admin", {
        id: post._id,
        title,
        enTitle,
        group,
        uploadDate,
        uploader,
        contents,
        source,
        images: finalImages
      });

      if (res.data.ok) {
        alert("수정되었습니다.");
        router.push('/');
        router.refresh();
      } else {
        alert("수정 실패: " + res.data.error);
      }

    } catch (error) {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 드래그 앤 드롭 핸들러
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.title}
              style={{fontFamily:'pretendard', background:'none', border:'none', outline:'none', color:'#FFF'}}
            />
            <input 
              type="text" 
              placeholder="영문 제목"
              value={enTitle}
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
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
                className={styles.date_form_style}
              /> 씀</div>
              <textarea 
                placeholder="내용"
                value={contents}
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
                {isUploading ? '뉴스 수정 중...' : '뉴스 수정하기'}
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

            <div className={styles.pro_detail_content_container}>
              {existingImages.map((url, idx) => (
                <div key={`old-${idx}`} className={styles.pro_detail_img_container2}>
                  <img src={url} />
                  <button onClick={() => removeExistingImage(idx)} className={styles.delete_btn}>X</button>
                </div>
              ))}

              {newPreviews.map((url, idx) => (
                <div key={`new-${idx}`} className={styles.pro_detail_img_container2}>
                  <img src={url} />
                  <button onClick={() => removeNewFile(idx)} className={styles.delete_btn}>X</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}