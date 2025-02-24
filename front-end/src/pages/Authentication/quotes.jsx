const randomQuote = () => {
    const quotes = [
        `Education is the key to unlocking the world, and staying organized is the key to mastering it`,
        "Assignments done on time, success achieved in life.",
        "Track, plan, and achieve — because deadlines wait for no one.",
        "Empowering students and teachers to focus on learning, not chasing deadlines.",
        "Where organization meets education — making every assignment count.",
        "Simplifying education, one assignment at a time.",
        "Deadlines aren’t scary when you’re prepared — stay on top of every task!",
        "Helping students succeed and teachers manage with ease.",
        "Your ultimate companion in turning tasks into triumphs.",
        "Because education flows smoother when assignments are on track.",
        "Stay organized, stay ahead — the future belongs to the prepared.",
        "Every assignment completed is a step closer to your goal.",
        "Learning is a journey — track your assignments, track your success.",
        "Time is precious — manage your assignments and manage your future.",
        "Success is just a deadline away when you're organized."
      ];
      
      const index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
      
}

export {randomQuote};