import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import loadingImg from "../assets/img/loading.svg"
import {useDebounce} from "../hooks/debouce";
import RepoCart from "../components/RepoCart/RepoCart";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounce = useDebounce(search)
    const {isLoading, isError, data: users} = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3,
        refetchOnFocus: true
    })

    useEffect(() => {
        setDropdown(debounce.length > 3 && users?.length! > 0)

    }, [debounce, users])

    const clickHandler = (userName: string) => {
        fetchRepos(userName)
        setDropdown(false)
    }


    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()
    return <div className="container p-5">

        {isError && <p className="text-center text-red-600">Something went wrong...</p>}
        <div className="relative w-[650px]">
            <input
                type="text"
                className="border px-4 py-2 w-full h-[42px] mb-2"
                placeholder="Search for Github username..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {isLoading && <div className="text-center"><img src={loadingImg}/></div>}
            {dropdown &&
                <ul className="list-none absolute top-[100%] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
                    {
                        users?.map(user =>
                            <li
                                key={user.id}
                                onClick={() => clickHandler(user.login)}
                                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                            > {user.login}</li>
                        )
                    }
                </ul>
            }
            <div className="container">
                {areReposLoading && <p className="text-center"> Repos are Loading...</p>}
                {repos?.map(repo => <RepoCart key={repo.id} repo={repo}/>)}
            </div>
        </div>
    </div>
};

export default HomePage;