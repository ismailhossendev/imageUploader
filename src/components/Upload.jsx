import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const Upload = () => {
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState("");

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const img = e.target.image.files[0];
        const formData = new FormData()
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_API_KEY}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const image = data.data.display_url;
                setLoading(false);
                setLink(image);
            })
    }
    const onCopy = React.useCallback(() => {
        alert('Copied')
    }, [])
    return (
        <div className='relative p-10 h-screen'>
            {loading &&
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400 right-1/2 top-10 absolute" bis_skin_checked="1"></div>
            }
            <div className='flex w-full justify-center h-full items-center'>

                <div className="bg-gray-800 p-5 rounded space-y-2">
                    <form onSubmit={handleSubmit} className="">
                        <input type="file" name="image" id="files" className="px-2 w-full py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" /> <br />
                        <input type="submit" className='w-full bg-indigo-500 py-2 mt-4 rounded-md' value="UPLOAD" />
                    </form>
                    {link &&
                        <>
                            <div className="max-h-[400px] max-w-[400px]">
                                <img className='w-full h-full rounded-lg ' src={link} alt="" />
                            </div>
                            <p className='text-center max-w-[200px] mx-auto text-white'>{link}</p>
                            <CopyToClipboard onCopy={onCopy} text={link}>
                                <button className='w-full py-2 bg-rose-600 rounded-sm text-gray-100 font-semibold font-serif hover:bg-rose-500'>Copy Link</button>
                            </CopyToClipboard>
                        </>
                    }
                </div>

            </div>
        </div >
    );
};

export default Upload;