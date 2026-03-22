export default function Header() {

  let nav = ['ABOUT', 'TEAM', 'OPPORTUNITY', 'NEWS']

  return (
    <header className='header'>
      <div className='header_container'>
        <div><img src='/logo.png' height={80}/></div>
        <div className='header_nav'>
          {nav.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
      </div>
    </header>
  )
}