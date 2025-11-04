'use client'
import React from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

const WebsiteProPersonalization = () => {
    
    const scrapeWebsite = async () => {
  const res = await fetch("/api/personalize/website-pro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: "Done" })
  });
  const data = await res.json();
  console.log(data.pageText)
};


  return (
    <>
    <button onClick={()=> scrapeWebsite()}>
    Web Scrapping
    </button>
    </>
  )
}

export default WebsiteProPersonalization