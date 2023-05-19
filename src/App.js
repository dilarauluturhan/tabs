import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  // API'den veri çekmek ve verileri component'ın state'ine yerleştirmek için:
  // "fetch" URL'e istek gönderir
  // "response"a gelen yanıt atanır, bu yanıt JSON formatında olmalı
  // "response.json()" metoduyla yanıt içeriği JSON'a dönüştürülür ve
  // "newJobs" a atanır
  // "setJobs" fonk kullanılarak "newJobs" değeri, component'ın state'ine(jobs) aktarılır
  // bu sayede alınan veriler bileşende saklanır ve bileşen yeniden render eder
  // "setLoading(false)" ile loading state'i false olarak ayarlanır
  // bu sayede verilerin başarılı bir şekilde alındığını ve yüklemenin tamamlandığını gösterir
  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Loading...
  if (loading) {
    return (
      <section className='section loading'>
        <h1>loading...</h1>
      </section>
    )
  }

  const { company, dates, duties, title } = jobs[value];
  return (
    <section className='section'>
      <div className='title'>
        <h2>Expierence</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/* button container */}
        <div className='btn-container'>
          {
            jobs.map((item, index) => {
              return (
                <button key={item.id} onClick={() => setValue(index)} className={`job-btn ${index === value && 'active-btn'}`}>
                  {item.company}
                </button>
              )
            })
          }
        </div>
        {/* job info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {
            duties.map((duty, index) => {
              return <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon'>
                </FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            })
          }
        </article>
      </div>
    </section>
  );
}

export default App;