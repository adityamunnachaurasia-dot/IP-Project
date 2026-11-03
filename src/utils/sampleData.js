/* Generates sample events for first-time visitors */
export function getSampleEvents() {
  const today = new Date();
  const shift = (days) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  return [
    {
      id: "evt_sample_1",
      name: "Tech Fest 2025",
      category: "Technical",
      date: shift(10),
      time: "10:00",
      venue: "Main Auditorium",
      organizer: "Computer Science Dept.",
      maxParticipants: 150,
      description:
        "Annual technology festival featuring coding contests, robotics and tech talks.",
    },
    {
      id: "evt_sample_2",
      name: "Cultural Night",
      category: "Cultural",
      date: shift(20),
      time: "18:30",
      venue: "Open Air Theatre",
      organizer: "Cultural Committee",
      maxParticipants: 200,
      description: "An evening of music, dance and drama performances by students.",
    },
    {
      id: "evt_sample_3",
      name: "AI Workshop",
      category: "Workshop",
      date: shift(-5),
      time: "14:00",
      venue: "Seminar Hall B",
      organizer: "AI Club",
      maxParticipants: 60,
      description: "Hands-on workshop on machine learning fundamentals and Python.",
    },
  ];
}