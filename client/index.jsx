import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function FrontPage() {
    return (
        <div>
            <h1>Matoppskrift database</h1>
            <ul>
                <li>
                    <Link to={"/recipes"}>Se alle oppskrifter</Link>
                </li>
                <li>
                    <Link to={"/recipes/new"}>Legg til ny oppskrift</Link>
                </li>
            </ul>
        </div>
    );
}

function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return { loading, error, data };
}

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ recipe: { _id, name, type, recipeType, time, topText, img} }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
            <Grid item xs={12} md={4} lg={3}>
                    <Card style={{
                        maxWidth: 290,
                        minWidth: 290,
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 10
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {name.charAt(0)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={name}
                            subheader={type}

                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={img}
                            alt={name + "bilde"}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Oppskrift:</Typography>
                                <Typography paragraph>
                                    {topText}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
            </Grid>

    );
}

function FavoriteIcon () {
    console.log("Favorite")
}

function ListRecipes() {
    const { loading, error, data } = useLoading(async () =>
        fetchJSON("/api/recipes")
    );

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: 1400,
            marginLeft: "auto",
            marginRight: "auto"
        }}>

            <Grid container spacing={2}>
                {data.map((recipe) => (
                    <RecipeReviewCard key={recipe._id} recipe={recipe} />
                ))}
            </Grid>
        </div>
    );
}

function AddNewRecipe() {
    return (
        <form>
            <h1>Add new movie</h1>
        </form>
    );
}

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/recipes"} element={<ListRecipes />} />
                <Route path={"/recipes/new"} element={<AddNewRecipe />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />, document.getElementById("app"));