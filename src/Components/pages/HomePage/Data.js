import CatHeart from '../../images/cat-icon.png'
import Earth from '../../images/earth.png'
import CandyCatCrown from '../../images/cat-crown-candy.png'

export const homeObjOne = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Chrome Pet Cat',
    headline: 'Unlimited Cuties',
    description: 'Gather all of the cats, save the planet!',
    buttonLabel: 'Get A Furry Friend',
    imgStart: '',
    img: CatHeart,
    alt: 'Cat icon',
    link: '/log-in'
}

export const homeObjTwo = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Carbon Footprint Tracking',
    headline: 'Help Save the Environment',
    description: 'Decrease your carbon footprint, and raise your pet!',
    buttonLabel: 'Check My Contribution',
    imgStart: 'start',
    img: Earth,
    alt: 'Earth',
    link: '/history'
}

export const homeObjThree = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Share with friends',
    headline: 'Achievements and Cat Skins',
    description: 'Unlock new cat breeds through contributing less carbon footprint.',
    buttonLabel: 'Share Right Meow',
    imgStart: '',
    img: CandyCatCrown,
    alt: 'Candy Cat',
    link: '/my-cat'
}