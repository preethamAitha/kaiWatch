import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface vulnPropsState{
    limit: number,
    id: number|null,
    cve: string|null,
    severity: string|null,
    cvss: string|null,
    status: string|null,
    kaiStatus: string|null,
    type: string|null,
    packageName: string|null,
    packageVersion: string|null,
    packageType: string|null,
    owner: string|null,
    advisoryType: string|null,
    sortBy: string|null,
    sortOrder: 'asc'|'desc'|'none', 
    offset: number
}

const initialState: vulnPropsState = {
    limit: 100,
    id: null,
    cve: null,
    severity: null,
    cvss: null,
    status: null,
    kaiStatus: null,
    type: null,
    packageName: null,
    packageVersion: null,
    packageType: null,
    owner: null,
    advisoryType: null,
    sortBy: null,
    sortOrder: 'none', 
    offset: 0
};

const vulnPropsSlice = createSlice({
    name: 'vulnProps',
    initialState,
    reducers: {
        setVulnSortOrder(state, action:PayloadAction<'asc'|'desc'|'none'>){
            state.sortOrder = action.payload
        },
        setVulnSortBy(state, action:{ payload: string | null; type: string; }){
            state.sortBy = action.payload
        }
    },
})

export const { setVulnSortOrder, setVulnSortBy } = vulnPropsSlice.actions;
export default vulnPropsSlice.reducer;