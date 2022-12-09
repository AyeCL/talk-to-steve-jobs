import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import React from 'react'


export default function Home() {

    const [input, setInput] = useState("")
    const [completion, setCompletion] = useState("")

    const handleKeyDown = React.useCallback(
        async (e) => {
            if (e.key === 'Enter') {
                setCompletion("Loading...")
                const response = await fetch('/api/conversation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({input: input}),
                })
                const data = await response.json()
                setCompletion(data.result)
                setInput("")
            }
        }, [input]);


    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     setCompletion("Loading...")
    //     const response = await fetch('/api/conversation', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({input: input}),
    //     })
    //     const data = await response.json()
    //     setCompletion(data.result)
    //     setInput("")
    // }

    return (
        <div className={styles.container} style={{backgroundColor: 'black',}}>
            <Head>
                <title>Steve Jobs Chatbot</title>
                <meta name="description" content="Talk to Steve Jobs!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={{
                backgroundImage: "url('/stevejobs.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",}} 
                className={styles.main}>
                <h1 className={styles.title} style={{
                    textShadow: "2px 2px 4px #000000",
                }}>
                    Talk to Steve Jobs!
                </h1>
                <p className={styles.description}>
                    {/* <form onSubmit={handleKeyDown}> */}
                        <input 
                            type="text" 
                            placeholder="Type here..." 
                            name="input"
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyDown={handleKeyDown} 
                            style={{
                                padding: "15px",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "20px",
                                width: "400px",
                            }}
                        />
                        {/* <button type="submit" onClick={handleSubmit} style={{
                            padding: "15px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "20px",
                            marginLeft: "10px",
                            backgroundColor: "white",
                        }}>Submit</button> */}
                    {/* </form> */}
                </p>
                <p className={styles.description} style={{
                    textShadow: "2px 2px 4px #000000",
                }}>
                    {completion}
                    {console.log(completion)}
                </p>
            </main>
        </div>
    )
}
