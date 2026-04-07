import React, { useEffect, useState } from 'react';
import DisplayFolders from './displayfolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileCode, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FileOrFolder = ({ fileName, path, name, contents, fileContents, setcde, openforpath, setopenforpath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = (contents) => {
    return typeof contents === 'object' && contents !== null;
  };

  let fullPath = path ? `${path}/${name}` : name;

  if (fullPath.startsWith(`${fileName}/`)) {
    fullPath = fullPath.substring(`${fileName}/`.length);
  } else if (fullPath === fileName) {
    fullPath = '';
  }

  const handleClick = () => {
    if (isFolder(contents)) {
      setIsOpen(!isOpen);
    } else {
      setopenforpath(`${path ? path + '/' : ''}${name}`);
      setcde(fileContents[fullPath] || '// File content empty');
    }
  };

  useEffect(() => {
    if (!isFolder(contents) && openforpath !== `${path ? path + '/' : ''}${name}`) {
      setIsOpen(false);
    } else if (!isFolder(contents) && openforpath === `${path ? path + '/' : ''}${name}`) {
      setIsOpen(true);
    }
  }, [openforpath, path, name, contents]);

  const isActive = !isFolder(contents) && openforpath === `${path ? path + '/' : ''}${name}`;

  return (
    <div className='flex flex-col select-none'>
      <div
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 text-sm
                    ${isActive
            ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300 font-semibold'
            : 'text-ink-600 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800'
          }`}
        onClick={handleClick}
      >
        {isFolder(contents) ? (
          <>
            <FontAwesomeIcon
              icon={isOpen ? faChevronDown : faChevronRight}
              className='w-3 h-3 text-ink-400 dark:text-ink-500'
            />
            <FontAwesomeIcon icon={faFolder} className='text-brand-500 dark:text-brand-400 w-4 h-4' />
          </>
        ) : (
          <FontAwesomeIcon icon={faFileCode} className='text-ink-400 dark:text-ink-500 w-4 h-4 ml-5' />
        )}
        <span className='truncate'>{name}</span>
      </div>

      {isOpen && isFolder(contents) && (
        <div className='ml-4 border-l border-ink-100 dark:border-ink-800 pl-2 mt-1'>
          <DisplayFolders
            contents={contents}
            fileContents={fileContents}
            fullPath={path ? `${path}/${name}` : name}
            setcde={setcde}
            setopenforpath={setopenforpath}
            openforpath={openforpath}
            fileName={fileName}
          />
        </div>
      )}
    </div>
  );
};

export default FileOrFolder;
