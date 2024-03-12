import {useEffect, useState} from "react";

const useOrigin = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const origne = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

  if (!mounted) return "";

  return origne;
}

export default useOrigin;
