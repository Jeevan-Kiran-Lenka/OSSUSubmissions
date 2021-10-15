import Part from "./Part"

function Content({part1, part2, part3, excercises1, excercises2, excercises3}) {
    return (
        <div>
            This is a content component
            <Part part={part1} excercises={excercises1}/>
            <Part part={part2} excercises={excercises2}/>
            <Part part={part3} excercises={excercises3}/>
        </div>
    )
}

export default Content
