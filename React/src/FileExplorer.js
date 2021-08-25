import React from 'react';
import FileBrowser, {Icons} from 'react-keyed-file-browser';

export default function FileExplorer({files}) {
  
    return (
      <FileBrowser
        files={files}
        icons={Icons.FontAwesome(4)}      
      />
    )
  
}
