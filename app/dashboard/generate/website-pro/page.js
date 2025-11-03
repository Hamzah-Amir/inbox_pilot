'use client'
import React from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

const WebsiteProPersonalization = () => {
    
    const scrapeWebsite = async (domain) =>{
        try {
            const url = domain.startsWith("http")?domain : `https://${domain}`
            const { data } = await axios.get(url, { timeout: 10000 });
            const $ = cheerio.load(data)
            console.log($)
            const headline = $("h1").first().text().trim()
            const subHeadline = $("h2").first().text().trim()
            const pageText = $("body").text().replace(/\s+/g, " ").trim()
            console.log("Heading: ", headline)
            return {headline, subHeadline, pageText}
        } catch (error) {
            return null
        }
    }

  return (
    <>
    <button onClick={() => scrapeWebsite("http://shop-scribe-xi.vercel.app")}>
    Web Scrapping
    </button>
    </>
  )
}

export default WebsiteProPersonalization