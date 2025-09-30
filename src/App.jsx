import React, { useState } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

const firestore = getFirestore(app);

const App = () => {
  const [docData, setDocData] = useState(null);        // For single document
  const [queryData, setQueryData] = useState([]);      // For query results
  const [message, setMessage] = useState("");          // For action messages

  const writeData = async () => {
    const result = await addDoc(collection(firestore, 'cities'), {
      name: "Delhi",
      pincode: 1234,
      lat: 123,
      lon: 456
    });
    setMessage(`Data added with ID: ${result.id}`);
  }

  const makeSubCollection = async () => {
    const result = await addDoc(collection(firestore, 'cities/K7fygMjj9MFQbj6EtJdH/places'), {
      name: "This is a Place",
      desc: "Awsm Desc",
      date: Date.now()
    });
    setMessage(`Sub-collection document added with ID: ${result.id}`);
  }

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "K7fygMjj9MFQbj6EtJdH");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setDocData(snap.data());
      setMessage("Document fetched successfully!");
    } else {
      setMessage("Document does not exist!");
    }
  }

  const getDocumentByQuery = async () => {
    const collectionRef = collection(firestore, "cities/K7fygMjj9MFQbj6EtJdH/places");
    const q = query(collectionRef, where("desc", "==", "Awsm Desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setQueryData([]);
      setMessage("No documents found!");
    } else {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueryData(data);
      setMessage("Query executed successfully!");
    }
  };

  const update = async () => {
    const docRef = doc(firestore, 'cities', 'K7fygMjj9MFQbj6EtJdH');
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      await updateDoc(docRef, { name: "New Delhi" });
      setMessage("Document updated!");
      getDocument(); // Refresh displayed data
    } else {
      setMessage("Document does not exist!");
    }
  }

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Firebase Firestore</h1>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6">
        <button onClick={writeData} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">Put Data</button>
        <button onClick={makeSubCollection} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">Put Sub Collection</button>
        <button onClick={getDocument} className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition">Get Document</button>
        <button onClick={getDocumentByQuery} className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-600 transition">Get Document By Query</button>
        <button onClick={update} className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition">Update</button>
      </div>

      {message && <p className="mb-4 text-gray-700">{message}</p>}

      {docData && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md mb-4">
          <h2 className="font-bold mb-2">Document Data:</h2>
          <pre>{JSON.stringify(docData, null, 2)}</pre>
        </div>
      )}

      {queryData.length > 0 && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md">
          <h2 className="font-bold mb-2">Query Results:</h2>
          {queryData.map((item) => (
            <div key={item.id} className="mb-2 p-2 border rounded">
              <strong>ID:</strong> {item.id} <br />
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;
