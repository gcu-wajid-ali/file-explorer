import React, { useState, useEffect } from 'react';
import FileExplorer from './FileExplorer';
import socketIOClient from "socket.io-client";

import 'font-awesome/css/font-awesome.min.css';

export default function App() {

  const [allDirectoryFiles, setDirectoryFiles] = useState([[]]);

  useEffect(() => {
    // socket connection 
    const socket = socketIOClient("http://127.0.0.1/");
    socket.on("getAllDirectories", data => {
      setDirectoryFiles(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return (
    <>
      {
        allDirectoryFiles.map((files, index) => {
          return (
            <div key={`${index}-files`}>
              <FileExplorer
                files={files}
              />
              <hr />
            </div>
          )
        })
      }
    </>
  )
}
