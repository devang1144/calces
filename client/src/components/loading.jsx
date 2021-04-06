import React from 'react'

const Loading = props => {
    return (
        <div style={{ height:"100vh", backgroundColor:"#000" }} className="d-flex justify-content-center align-items-center container-fluid p-0">
            <svg className="loading-component" width="363" height="363" viewBox="0 0 363 363" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M181.5 363C281.74 363 363 281.74 363 181.5C363 81.2603 281.74 0 181.5 0C81.2603 0 0 81.2603 0 181.5C0 281.74 81.2603 363 181.5 363ZM181.5 356C277.874 356 356 277.874 356 181.5C356 85.1263 277.874 7 181.5 7C85.1263 7 7 85.1263 7 181.5C7 277.874 85.1263 356 181.5 356Z" fill="#E2E2E2"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M342.24 114.055C342.219 114.002 342.209 113.945 342.209 113.887V113.887C342.212 113.734 342.294 113.593 342.425 113.515L343.999 112.579C345.951 111.419 348.48 112.263 349.292 114.384C357.563 136.009 361.966 159.787 361.587 184.695C361.193 210.516 355.698 234.965 346.157 256.937C345.445 258.577 343.516 259.284 341.897 258.526V258.526C340.753 257.989 340.029 256.832 340.049 255.568L340.05 255.458C340.057 255.019 340.149 254.586 340.32 254.181C349.282 232.968 354.439 209.428 354.818 184.592C355.2 159.549 350.686 135.674 342.24 114.055Z" fill="white"/>
            </svg>
        </div>
    )

}

export default Loading