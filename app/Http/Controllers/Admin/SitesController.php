<?php

namespace App\Http\Controllers\Admin;

use App\Models\Site;
use App\Models\Region;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SitesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function accessableSite(Request $request)
    {
        // return response()->json([
        //     'request' => $request
        // ], 404);


        $ids = [ 1,2,3,4];
        $regions = $request->region;

        // $validate = $request->validate([
        //     'region' => 'required'
        // ]);

        if($regions !=  null) {
            try {

                $region_codes = Region::whereIn('id', $regions )->get('region_code')->toArray();
                foreach($region_codes as $key => $value){
                    $regionCodes[$key] = $value['region_code'];
                }

                $sites = Site::whereIn('region_code', $regionCodes)->get()->toArray();

            } catch (Exception $e){
                    return response()->json([
                        'error' => "error"
                    ], 404);
            }
        } else {
            return response()->json([
                'message' => "The given data was invalid"
            ], 404);
        }

        // $sites = Site::whereIn('id', $regions)->get();

        return $sites;
    }
}
