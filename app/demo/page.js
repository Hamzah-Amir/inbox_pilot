import React from 'react'

const DemoPage = () => {
    return (
        <>
            <main className='min-h-screen flex justify-center items-center p-6'>
                <video src="/demo.mp4"
                    controls
                    autoPlay
                    className="rounded-lg w-full max-w-3xl border border-neutral-700">
                </video>
            </main>
        </>
    )
}

export default DemoPage