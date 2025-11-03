import React from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

const WebsiteProPersonalization = () => {
    
    const scrapeWebsite = async (domain) =>{
        try {
            const url = domain.startsWith("http")?domain : `https://${domain}`
            const { data } = await  
        } catch (error) {
            return null
        }
    }

  return (
    <>
    
    </>
  )
}

export default WebsiteProPersonalization