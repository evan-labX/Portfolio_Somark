'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speed = 20,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    
    if (!text) {
      setIsComplete(true)
      return
    }

    const startTimeout = setTimeout(() => {
      setIsTyping(true)
      let index = 0

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, delay, onComplete])

  const skipToEnd = useCallback(() => {
    setDisplayedText(text)
    setIsTyping(false)
    setIsComplete(true)
    onComplete?.()
  }, [text, onComplete])

  return {
    displayedText,
    isTyping,
    isComplete,
    skipToEnd,
  }
}

