
function dedupes( rgArr )
{
	var i = 0;
	var j = i+1;


	while ( j < rgArr.length )
	{
		bjLog( "------ Top ------", 2 );
		bjLog( "i = " + i + "; j = " + j, 2 );
		bjLog( rgArr, 2 );

		if ( rgArr[i] != rgArr[j] )
		{
			i++;
			rgArr[i] = rgArr[j];
		}

		j++;

	}

	while ( i > 0 && i < j-1 )
	{
		i++;
		rgArr.pop();

	}

	return rgArr;


}



rgTest1 = [1,1,1,2,3,3,4,5,6,7,7,7,7,8,9];
rgTest2 = [1,1,1,1,1,1,1];

bjLog( dedupes(rgTest1) );
bjLog( dedupes(rgTest2) );