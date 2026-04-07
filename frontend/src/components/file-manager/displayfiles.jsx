const DisplayFile = ({fileContents,fullPath,setcde}) => {
    console.log(fullPath)
    setcde(fileContents[fullPath])
    return (
      null
    );
  };

  export default DisplayFile;