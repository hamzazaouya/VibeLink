
    const iconButtons: [string, string][] = [
        ["📗", "quran"],
        ["💪", "workout"],
        ["⚽", "soccer"],
        ["🏀", "basketball"],
        ["🏊‍♂️", "swimming"],
        ["♟️", "chess"],
        ["🎣", "fishing"],
        ["☕", "coffee"],
        ["📈", "investing"],
        ["📷", "photography"],
        ["💻", "coding"],
        ["🚴‍♂️", "cycling"],
        ["🥾", "hiking"],
        ["⛺", "camping"],
        ["✍️", "blogging"],
        ["🕹️", "gaming"],
        ["🎨", "drawing"],
        ["🧑‍🍳", "cooking"],
        ["🎙️", "podcast"],
        ["🌱", "gardening"],
        ["📚", "reading"],
        ["🧁", "baking"],
        ["🏄‍♂️", "surfing"],
        ["🧶", "knitting"],
        ["🏃‍♂️", "running"],
        ["✈️", "traveling"],
        ["🐦", "bird watching"],
        ["🤝", "volunteering"],
        ["🎲", "board Games"],
        ["🧩", "puzzle Solving"],
        ["🤖", "robotics"],
        ["🖌️", "calligraphy"],
        ["🛶", "canoeing"],
        ["🏹", "archery"],
        ["📖", "storytelling"],
        ["🛹", "skateboarding"],
        ["🧗‍♂️", "rock Climbing"],
        ["🎭", "theater"],
        ["🚣‍♀️", "rowing"],
        ["🧙‍♂️", "cosplaying"],
        ["📡", "astronomy"],
        ["🎮", "video gaming"],
        ["🥋", "martial arts"],
        ["🍰", "cake baking"],
    ];

const hobbies = new Map();

iconButtons.forEach((e) => {
    hobbies.set(e[1], e[0]);
})

interface hobbieType {
    hobbieTitle :string
}

function Hobbie ({hobbieTitle}: hobbieType) {
    const icon = hobbies.get(hobbieTitle);
    return (
        <div className=" flex rounded-full border px-3 py-2 text-white text-sm">
            <span className="pr-1">{hobbieTitle}</span> <span>{icon}</span>
        </div>
    );
}

export default Hobbie;