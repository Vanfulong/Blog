import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Card from "../Card/Card";
export type Data = {
  [key: string]: any;
};
const NewFeed = () => {
  const [data, setData] = useState<Array<Data>>([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        let list: Array<object> = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-h-screen">
      {data.map((post) => (
        <Card
          key={post.id}
          id={post.id}
          title={post.title}
          urlImage={post.urlThumbnail}
        />
      ))}
    </div>
  );
};

export default NewFeed;
