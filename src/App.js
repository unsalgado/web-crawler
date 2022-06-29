import { useState } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import "./App.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Config from "./config";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


function App() {

    const [inputText, setInputText] = useState("");
    const [data, setData] = useState({ sites: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [errorText, setErrText] = useState('');

    let inputHandler = (e) => {
        //convert search text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const handleClick = async () => {

        setIsLoading(true);
        try {
            if (inputText.length === 0) {
                setErrText("Input Cannot be empty!");
            } else {
                const { data } = await axios.get(Config.getCommonURL() + '/extracted-url-by-text?text=' + inputText, {
                    headers: {
                        Accept: 'application/json',
                    },
                });
                setErrText("");
                setData(data);
            }



        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main">
            <h1>Web Crawler</h1>

            <Stack direction="row" spacing={2} >
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Search Here"
                    value={inputText}
                    onChange={inputHandler}
                    required
                    error={inputText.length === 0 ? false : true}
                    helperText={errorText}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Search
                </Button>
            </Stack>

            {err && <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {err}
            </Alert>}

            {isLoading && <h2>Loading...</h2>}

            {data.sites.map(siteData => {

                return (
                    <TableRow>
                        <TableCell>
                            {siteData.url}
                        </TableCell>
                    </TableRow>

                );
            })}
        </div>
    );
}

export default App;