TODO: 
Is dirty has to be implemented again 
The form should not submit and return an info message that the doc is unedited (This saves the whole logic of saving the same document or file and absolutely removes battling with the req.file)
Frontend Guard

<!-- Handle reload -->
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Discard updates?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

    <!-- Handle local file validations - triggered by the fileInputRef -->
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/webp", "image/jpeg"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (PNG/JPG/WebP)");
      e.target.value = null;
      return;
    }

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setThumbnail(file);
    }
  };

  <!-- Reset Image -->
    const handleResetImage = () => {
    setThumbnail(null);
    setPreview(initialPreview);
    // get the current position of the ref which makes it possible to access the value
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Restored original cover image");
  };