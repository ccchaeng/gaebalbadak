import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = doc(db, "users", currentUser.uid);

                // Firestore에서 실시간 데이터 감지
                const unsubscribeFirestore = onSnapshot(userDoc, (docSnap) => {
                    if (docSnap.exists()) {
                        setUser({ uid: currentUser.uid, ...docSnap.data() });
                    }
                });

                return () => unsubscribeFirestore();
            } else {
                setUser(null);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return { user };
};

export default useAuth;
