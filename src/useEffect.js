import { collection, query, orderBy, getDocs } from "firebase/firestore"; // ✅ Firestore 불러오기

useEffect(() => {
  const fetchPosts = async () => {
    try {
      console.log("🔥 Firestore에서 데이터 가져오는 중...");
      const q = query(collection(db, "post_Apply"), orderBy("createdAt", "desc")); // ✅ 최신순 정렬
      const querySnapshot = await getDocs(q);

      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log("✅ Firestore에서 가져온 게시글:", postsData);
      setCurrentPosts(postsData); // ✅ Firestore에서 가져온 데이터 저장
    } catch (error) {
      console.error("❌ Firestore 데이터 가져오기 실패:", error);
    }
  };

  fetchPosts();
}, []);
