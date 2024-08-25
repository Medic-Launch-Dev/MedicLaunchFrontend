import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { useServiceProvider } from "../../services/ServiceProvider";

function ProgressPieChart() {
  const { practiceStore, questionsStore } = useServiceProvider();
  const [slices, setSlices] = useState({ correct: 0, incorrect: 0, unanswered: 0 });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const totalQuestions = await questionsStore.getQuestionCount();
    const practiceStats = await practiceStore.getPracticeStats();

    setSlices({
      correct: practiceStats.totalCorrect,
      incorrect: practiceStats.totalIncorrect,
      unanswered: totalQuestions - practiceStats.totalCorrect - practiceStats.totalCorrect,
    });
  }

  // You can calculate the total completed percentage or any value you want to display
  const totalCompleted = slices.correct + slices.incorrect;
  const percentageCompleted = Math.round((totalCompleted / (totalCompleted + slices.unanswered)) * 100);

  return (
    <PieChart width={160} height={160}>
      <Pie
        data={[
          { name: 'Unanswered', value: slices.unanswered, fill: '#EFF4FB' },
          { name: 'Incorrect', value: slices.incorrect, fill: '#FFABAB' },
          { name: 'Correct', value: slices.correct, fill: '#A4E29F' },
        ]}
        cx="50%"
        cy="50%"
        dataKey="value"
        nameKey="name"
        outerRadius={80}
        innerRadius={60}
        startAngle={-270}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={28}
        fontWeight={600}
        fill="#2092c2"
      >
        {!Number.isNaN(percentageCompleted) && `${percentageCompleted}%`}
      </text>
    </PieChart>
  )
}

export default observer(ProgressPieChart);