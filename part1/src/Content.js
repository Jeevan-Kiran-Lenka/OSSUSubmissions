import Part from "./Part"

function Content({parts}) {
    return (
        <div>
            This is a content component
            <Part part={parts[0].name} excercises={parts[0].exercises}/>
            <Part part={parts[1].name} excercises={parts[1].exercises}/>
            <Part part={parts[2].name} excercises={parts[2].exercises}/>
        </div>
    )
}

export default Content
