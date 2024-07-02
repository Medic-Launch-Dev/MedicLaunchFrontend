const ProgressBar = ({ totalQuestions, correctQuestions, incorrectQuestions }) => {
  const correctPercentage = (correctQuestions / totalQuestions) * 100;
  const incorrectPercentage = (incorrectQuestions / totalQuestions) * 100;

  return (
    <div style={{ width: '100%', backgroundColor: '#EFF4FB', height: '12px', borderRadius: 100 }}>
      <div
        style={{
          width: `${correctPercentage}%`,
          backgroundColor: '#A4E29F',
          height: '100%',
          float: 'left',
          borderRadius: "12px 0 0 12px"
        }}
      />
      <div
        style={{
          width: `${incorrectPercentage}%`,
          backgroundColor: '#FFABAB',
          height: '100%',
          float: 'left',
          borderRadius: correctPercentage > 0 ? "0 12px 12px 0" : "12px"
        }}
      />
    </div>
  );
};

export default ProgressBar;