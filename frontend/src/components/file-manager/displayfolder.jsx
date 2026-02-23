import React from 'react';
import FileOrFolder from './fileorfolder';

const DisplayFolders = ({ contents, fileContents, fullPath, setcde, setopenforpath, openforpath, fileName }) => {
  return (
    <div className='flex flex-col gap-0.5'>
      {Object.entries(contents).map(([itemName, subContents]) => (
        <FileOrFolder
          key={itemName}
          path={fullPath}
          name={itemName}
          contents={subContents}
          fileContents={fileContents}
          setcde={setcde}
          setopenforpath={setopenforpath}
          openforpath={openforpath}
          fileName={fileName}
        />
      ))}
    </div>
  );
};

export default DisplayFolders;