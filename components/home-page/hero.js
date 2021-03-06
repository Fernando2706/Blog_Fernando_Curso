import Image from 'next/image'

import classes from './hero.module.css'


function Hero(){
    return(
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src ="/images/sites/cat.png" alt="An image showing a Cat" width={300} height={300}></Image>
            </div>
            <h1>Hi, I´m Fernando</h1>
            <p>I blog about Web development - expecially frontend frameworks like React</p>
        </section>
    )
}

export default Hero