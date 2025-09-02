
import TextType from './TextType';


const Hero = () => {
  return (
    <main className='mt-4 '>
      <div className="text-xl">
        <TextType
          text={["A home for all stories", "Read, dream, enjoy"]}
          textColors={["#F97316", "#FF5733"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-orange-500 font-semibold font-serif tracking-widest cursor-pointer"
        />

      </div>


    </main>
  )
}

export default Hero