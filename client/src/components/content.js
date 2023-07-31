import img from '../img/OIP.jpg'

const Content = () => {
    return (
        <main>
            <div  className="post">
                <div className="post__img-box">
                    <img src={img} alt="img" className="post__img" />
                </div>
                <div className="post__texts">
                    <h2 className="post__head">Trump could face conspiracy, tampering charges in Jan. 6 case</h2>
                    <p className="post__info">
                        <a href="##" className="post__author">Adebayo Jubreel</a>
                        <time>2023-07-20 11:10:59</time>
                    </p>
                    <p className="post__body">Former US President, Donald Trump may soon face charges of conspiracy, civil rights violations, and obstruction of justice following a Justice Department investigation into his actions on and before </p>
                </div>
            </div>
        </main>
    )
}

export default Content